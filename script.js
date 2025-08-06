// Page Navigation System
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Page elements
    const pages = document.querySelectorAll('.page');
    const sliderImages = document.getElementById('sliderImages');
    const sliderTitle = document.getElementById('sliderTitle');
    const sliderLocation = document.getElementById('sliderLocation');
    const sectionIndicator = document.getElementById('sectionIndicator');
    const prevSlideBtn = document.getElementById('prevSlide');
    const nextSlideBtn = document.getElementById('nextSlide');
    
    // Slider data
    const sliderData = [
        {
            type: 'series',
            target: 'series',
            title: '"RAINY SUNDAY"',
            location: 'Manhattan, NYC',
            section: 'Section 1'
        },
        {
            type: 'film',
            target: 'film',
            title: '"STREET FILM"',
            location: 'Brooklyn, NYC',
            section: 'Section 2'
        },
        {
            type: 'video',
            target: 'video',
            title: '"CITY RHYTHMS"',
            location: 'Queens, NYC',
            section: 'Section 3'
        }
    ];
    
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Page Navigation Functions
    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update navigation active state
        navLinks.forEach(link => link.classList.remove('active'));
        const activeNavLink = document.querySelector(`[data-target="${pageId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
        
        // Close mobile menu if open
        if (mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    // Slider Functions
    function updateSlider(slideIndex) {
        // Update slider images
        const slides = document.querySelectorAll('.slider-slide');
        slides.forEach(slide => slide.classList.remove('active'));
        slides[slideIndex].classList.add('active');
        
        // Update text content
        const currentData = sliderData[slideIndex];
        sliderTitle.textContent = currentData.title;
        sliderLocation.textContent = currentData.location;
        sectionIndicator.textContent = currentData.section;
        
        // Store target for click navigation
        sliderTitle.setAttribute('data-target', currentData.target);
        
        currentSlide = slideIndex;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % sliderData.length;
        updateSlider(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + sliderData.length) % sliderData.length;
        updateSlider(prevIndex);
    }
    
    // Mobile Menu Functions
    function toggleMobileMenu() {
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
    }
    
    // Event Listeners
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-target');
            if (targetPage) {
                showPage(targetPage);
            }
        });
    });
    
    // Slider navigation arrows
    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', prevSlide);
    }
    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', nextSlide);
    }
    
    // Slider title click navigation
    if (sliderTitle) {
        sliderTitle.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target');
            if (targetPage) {
                showPage(targetPage);
            }
        });
    }
    
    // Slider image click navigation
    const sliderSlides = document.querySelectorAll('.slider-slide');
    sliderSlides.forEach(slide => {
        slide.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target');
            if (targetPage) {
                showPage(targetPage);
            }
        });
    });
    
    // Back buttons
    const backBtns = document.querySelectorAll('.back-btn');
    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target');
            if (targetPage) {
                showPage(targetPage);
            }
        });
    });
    
    // Touch/swipe functionality for slider
    if (sliderImages) {
        sliderImages.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        sliderImages.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        // Mouse drag functionality for desktop
        let isDragging = false;
        let startX = 0;
        
        sliderImages.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
            sliderImages.style.cursor = 'grabbing';
        });
        
        sliderImages.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        sliderImages.addEventListener('mouseup', function(e) {
            if (!isDragging) return;
            isDragging = false;
            sliderImages.style.cursor = 'grab';
            
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
        
        sliderImages.addEventListener('mouseleave', function() {
            isDragging = false;
            sliderImages.style.cursor = 'grab';
        });
        
        // Set initial cursor
        sliderImages.style.cursor = 'grab';
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
    
    // Series page functionality
    const seriesPreviews = document.querySelectorAll('.series-preview');
    seriesPreviews.forEach(preview => {
        preview.addEventListener('click', function() {
            const seriesId = this.getAttribute('data-series');
            console.log(`Opening series: ${seriesId}`);
            // Here you would open the full series gallery
            // For now, we'll just log it
        });
    });
    
    // Film page functionality
    const filmPhotos = document.querySelectorAll('.film-photo');
    filmPhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            const collectionId = this.getAttribute('data-collection');
            const photoId = this.getAttribute('data-photo');
            
            if (collectionId) {
                console.log(`Opening film collection: ${collectionId}`);
                // Here you would open the film collection slider
            } else if (photoId) {
                console.log(`Opening single photo: ${photoId}`);
                // Here you would open the single photo view
            }
        });
    });
    
    // Video page functionality
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(video => {
        video.addEventListener('click', function() {
            console.log('Playing video');
            // Here you would implement video playback
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenuBtn && mobileNav && 
            !mobileMenuBtn.contains(e.target) && 
            !mobileNav.contains(e.target)) {
            if (mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Resize handler to close mobile menu on desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const currentPage = document.querySelector('.page.active');
        
        if (currentPage && currentPage.id === 'homepage') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetPage = sliderTitle.getAttribute('data-target');
                if (targetPage) {
                    showPage(targetPage);
                }
            }
        }
        
        // ESC key to go back to homepage from any page
        if (e.key === 'Escape' && currentPage && currentPage.id !== 'homepage') {
            e.preventDefault();
            showPage('homepage');
        }
    });
    
    // Initialize the page
    updateSlider(0);
    showPage('homepage');
}); 