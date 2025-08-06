// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero image slider functionality
    const heroSlider = document.getElementById('heroSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    // Indicators removed to match reference design
    const heroTitle = document.getElementById('heroTitle');
    const heroLocation = document.getElementById('heroLocation');
    
    // Collection data with different types of content
    const collections = [
        {
            id: 'rainy-sunday-series',
            type: 'series',
            src: 'ISAAC1.JPG',
            title: '"RAINY SUNDAY"',
            location: 'Manhattan, NYC',
            description: 'Street photography series capturing the mood of NYC on rainy days'
        },
        {
            id: 'street-film',
            type: 'film',
            src: 'ISAAC1.JPG',
            title: '"STREET FILM"',
            location: 'Brooklyn, NYC',
            description: 'Analog film photography exploring urban landscapes'
        },
        {
            id: 'city-rhythms-video',
            type: 'video',
            src: 'ISAAC1.JPG',
            title: '"CITY RHYTHMS"',
            location: 'Queens, NYC',
            description: 'Video documentary of NYC street life'
        },
        {
            id: 'night-scenes-series',
            type: 'series',
            src: 'ISAAC1.JPG',
            title: '"NIGHT SCENES"',
            location: 'Manhattan, NYC',
            description: 'After-dark photography series'
        },
        {
            id: 'analog-dreams-film',
            type: 'film',
            src: 'ISAAC1.JPG',
            title: '"ANALOG DREAMS"',
            location: 'Bronx, NYC',
            description: '35mm film collection'
        }
    ];
    
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    function updateSlide(slideIndex) {
        // Remove active class from all slides
        document.querySelectorAll('.hero-slide').forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        document.querySelectorAll('.hero-slide')[slideIndex].classList.add('active');
        
        // Update text content
        const currentCollection = collections[slideIndex];
        heroTitle.textContent = currentCollection.title;
        heroLocation.textContent = currentCollection.location;
        
        // Store current collection for click navigation
        heroTitle.setAttribute('data-collection-id', currentCollection.id);
        heroTitle.setAttribute('data-collection-type', currentCollection.type);
        
        currentSlide = slideIndex;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % collections.length;
        updateSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + collections.length) % collections.length;
        updateSlide(prevIndex);
    }
    
    // Add click navigation to collection
    if (heroTitle) {
        heroTitle.style.cursor = 'pointer';
        heroTitle.addEventListener('click', function() {
            const collectionId = this.getAttribute('data-collection-id');
            const collectionType = this.getAttribute('data-collection-type');
            navigateToCollection(collectionId, collectionType);
        });
    }
    
    function navigateToCollection(collectionId, collectionType) {
        // Navigate to the appropriate section based on type
        let targetSection;
        switch(collectionType) {
            case 'series':
                targetSection = document.getElementById('series');
                break;
            case 'film':
                targetSection = document.getElementById('film');
                break;
            case 'video':
                targetSection = document.getElementById('video');
                break;
            default:
                targetSection = document.getElementById('series');
        }
        
        if (targetSection) {
            // Smooth scroll to section
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Highlight the specific collection (you can expand this later)
            console.log(`Navigating to ${collectionType}: ${collectionId}`);
        }
    }
    
    // Arrow navigation
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Indicator navigation removed to match reference design
    
    // Touch/swipe functionality
    if (heroSlider) {
        heroSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        heroSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        // Mouse drag functionality for desktop
        let isDragging = false;
        let startX = 0;
        
        heroSlider.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
            heroSlider.style.cursor = 'grabbing';
        });
        
        heroSlider.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        heroSlider.addEventListener('mouseup', function(e) {
            if (!isDragging) return;
            isDragging = false;
            heroSlider.style.cursor = 'grab';
            
            const endX = e.clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum drag distance
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        heroSlider.addEventListener('mouseleave', function() {
            isDragging = false;
            heroSlider.style.cursor = 'grab';
        });
        
        // Set initial cursor
        heroSlider.style.cursor = 'grab';
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    // Auto-slide functionality (optional - uncomment to enable)
    // setInterval(() => {
    //     nextSlide();
    // }, 5000); // Change slide every 5 seconds
    
    // Add click functionality to gallery items
    document.querySelectorAll('.gallery-item, .video-item').forEach(item => {
        item.addEventListener('click', function() {
            const collectionId = this.getAttribute('data-collection');
            if (collectionId) {
                // Find the collection data
                const collection = collections.find(c => c.id === collectionId);
                if (collection) {
                    console.log(`Opening collection: ${collection.title} (${collection.type})`);
                    // Here you would open a detailed view of the collection
                    // For now, we'll just log it
                }
            }
        });
    });
    
    // Add active class to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Resize handler to close mobile menu on desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileNav.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}); 