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
        
        // Handle body class for homepage scrolling
        if (pageId === 'homepage') {
            document.body.classList.add('homepage-active');
            // Restart photo rotation when returning to homepage
            if (allPhotos && allPhotos.length > 0) {
                startPhotoRotation();
            }
        } else {
            document.body.classList.remove('homepage-active');
            // Stop photo rotation when leaving homepage
            stopPhotoRotation();
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
    
    // Slider navigation arrows - now controls photo rotation
    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', function() {
            prevPhoto();
            // Restart rotation timer
            startPhotoRotation();
        });
    }
    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', function() {
            nextPhoto();
            // Restart rotation timer
            startPhotoRotation();
        });
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
    
    // Add hover controls to pause/resume rotation
    const sliderImageContainer = document.querySelector('.slider-image-container');
    if (sliderImageContainer) {
        sliderImageContainer.addEventListener('mouseenter', pauseRotation);
        sliderImageContainer.addEventListener('mouseleave', resumeRotation);
        
        // Click to navigate to series
        sliderImageContainer.addEventListener('click', function() {
            navigateToCurrentPhotoSeries();
        });
        
        // Add cursor pointer to indicate clickability
        sliderImageContainer.style.cursor = 'pointer';
    }

    // Navigate to the series of the currently displayed photo
    function navigateToCurrentPhotoSeries() {
        if (currentPhotoIndex < 0 || currentPhotoIndex >= allPhotos.length) return;
        
        const currentPhoto = allPhotos[currentPhotoIndex];
        const collectionKey = currentPhoto.collection;
        
        console.log('Navigating to series:', collectionKey, 'Photo:', currentPhoto.src); // Debug log
        
        // Stop rotation when navigating away
        stopPhotoRotation();
        
        // Find the photo's index within its specific collection
        const photoIndexInCollection = photoCollections[collectionKey].photos.indexOf(currentPhoto.src);
        
        console.log('Photo index in collection:', photoIndexInCollection); // Debug log
        
        // Navigate to series page
        showPage('series');
        
        // Small delay to ensure page is loaded, then open carousel
        setTimeout(() => {
            openCarousel(collectionKey, photoIndexInCollection);
        }, 100);
    }
    
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
    
    // Photo collections data
    const photoCollections = {
        'arte-mental': {
            title: 'Arte Mental',
            photos: [
                'artemental/ARTE1.jpg',
                'artemental/ARTE3.JPEG',
                'artemental/ARTE4.jpg',
                'artemental/ARTE5.JPEG',
                'artemental/ARTE6.jpg',
                'artemental/ARTE7.jpg',
                'artemental/ARTE8.JPEG',
                'artemental/ARTE9.jpg',
                'artemental/ARTE9.JPEG'
            ]
        },
        'analog-dreams': {
            title: 'Analog Dreams',
            photos: [
                'analogdreams/A63AE8AC-8344-417F-98C0-4DEBAA5C15E0.JPEG',
                'analogdreams/DSCF8917.JPG',
                'analogdreams/DSCF8874.JPG',
                'analogdreams/FA9DB80E-F9C4-43CE-8575-0F1F187AAF6A.JPG',
                'analogdreams/FD578689-AB37-4D9A-A7C2-2728013B4C10.JPG',
                'analogdreams/DSCF8852.JPG'
            ]
        },
        'rainy-sunday': {
            title: 'Rainy Sunday',
            photos: [
                'ISAAC1.JPG',
                'DSCF2964.JPG'
            ]
        },
        'night-scenes': {
            title: 'Night Scenes', 
            photos: [
                'ISAAC1.JPG'
            ]
        }
    };

    // Create master photo gallery array
    const allPhotos = [];
    Object.keys(photoCollections).forEach(collectionKey => {
        photoCollections[collectionKey].photos.forEach(photo => {
            allPhotos.push({
                src: photo,
                collection: collectionKey,
                title: photoCollections[collectionKey].title
            });
        });
    });
    
    console.log('All photos loaded:', allPhotos.length, allPhotos); // Debug log

    // Photo rotation variables
    let currentPhotoIndex = 0;
    let photoRotationInterval = null;
    let isRotationPaused = false;
    const rotationSpeed = 4000; // 4 seconds per photo

    // Initialize photo rotation
    function initializePhotoRotation() {
        if (allPhotos.length === 0) return;
        
        // Set initial photo
        updateHeroPhoto(0);
        
        // Start automatic rotation
        startPhotoRotation();
    }

    // Update hero photo
    function updateHeroPhoto(photoIndex) {
        if (photoIndex < 0 || photoIndex >= allPhotos.length) return;
        
        currentPhotoIndex = photoIndex;
        const selectedPhoto = allPhotos[photoIndex];
        
        // Update the main slider image
        const currentSlide = document.querySelector('.slider-slide.active');
        if (currentSlide) {
            const img = currentSlide.querySelector('img');
            if (img) {
                img.src = selectedPhoto.src;
                img.alt = selectedPhoto.title;
            }
        }
        
        // Update slider title and location based on photo collection
        const photoCollection = photoCollections[selectedPhoto.collection];
        if (photoCollection && sliderTitle && sliderLocation) {
            sliderTitle.textContent = `"${photoCollection.title.toUpperCase()}"`;
            sliderLocation.textContent = getLocationForCollection(selectedPhoto.collection);
        }
        
        // Update section indicator with photo count
        if (sectionIndicator) {
            sectionIndicator.textContent = `Photo ${photoIndex + 1} of ${allPhotos.length}`;
        }
    }

    // Get location text for collection
    function getLocationForCollection(collectionKey) {
        const locations = {
            'arte-mental': 'NYC Collection',
            'analog-dreams': 'Film Series',
            'rainy-sunday': 'Manhattan, NYC',
            'night-scenes': 'Manhattan, NYC'
        };
        return locations[collectionKey] || 'Photography';
    }

    // Start automatic photo rotation
    function startPhotoRotation() {
        if (photoRotationInterval) {
            clearInterval(photoRotationInterval);
        }
        
        photoRotationInterval = setInterval(() => {
            if (!isRotationPaused) {
                nextPhoto();
            }
        }, rotationSpeed);
    }

    // Stop photo rotation
    function stopPhotoRotation() {
        if (photoRotationInterval) {
            clearInterval(photoRotationInterval);
            photoRotationInterval = null;
        }
    }

    // Next photo in rotation
    function nextPhoto() {
        const nextIndex = (currentPhotoIndex + 1) % allPhotos.length;
        updateHeroPhoto(nextIndex);
    }

    // Previous photo in rotation
    function prevPhoto() {
        const prevIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
        updateHeroPhoto(prevIndex);
    }

    // Pause/resume rotation on hover
    function pauseRotation() {
        isRotationPaused = true;
    }

    function resumeRotation() {
        isRotationPaused = false;
    }

    // Carousel elements
    const carouselModal = document.getElementById('carouselModal');
    const carouselOverlay = document.getElementById('carouselOverlay');
    const carouselClose = document.getElementById('carouselClose');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselImage = document.getElementById('carouselImage');
    const carouselTitle = document.getElementById('carouselTitle');
    const carouselCounter = document.getElementById('carouselCounter');

    let currentCollection = null;
    let currentCarouselIndex = 0;

    // Carousel functions
    function openCarousel(collectionId, startIndex = 0) {
        console.log('Opening carousel for:', collectionId, 'at index:', startIndex); // Debug log
        
        currentCollection = photoCollections[collectionId];
        if (!currentCollection) {
            console.error('Collection not found:', collectionId); // Debug log
            return;
        }

        currentCarouselIndex = startIndex;
        updateCarouselImage();
        
        if (carouselModal) {
            carouselModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            console.error('Carousel modal not found'); // Debug log
        }
    }

    function closeCarousel() {
        carouselModal.classList.remove('active');
        document.body.style.overflow = '';
        currentCollection = null;
        currentCarouselIndex = 0;
    }

    function updateCarouselImage() {
        if (!currentCollection) return;

        const photo = currentCollection.photos[currentCarouselIndex];
        carouselImage.src = photo;
        carouselImage.alt = `${currentCollection.title} - Photo ${currentCarouselIndex + 1}`;
        carouselTitle.textContent = currentCollection.title;
        carouselCounter.textContent = `${currentCarouselIndex + 1} / ${currentCollection.photos.length}`;
    }

    function nextCarouselPhoto() {
        if (!currentCollection) return;
        currentCarouselIndex = (currentCarouselIndex + 1) % currentCollection.photos.length;
        updateCarouselImage();
    }

    function prevCarouselPhoto() {
        if (!currentCollection) return;
        currentCarouselIndex = (currentCarouselIndex - 1 + currentCollection.photos.length) % currentCollection.photos.length;
        updateCarouselImage();
    }

    // Series page functionality
    const seriesPreviews = document.querySelectorAll('.series-preview');
    seriesPreviews.forEach(preview => {
        preview.addEventListener('click', function() {
            const seriesId = this.getAttribute('data-series');
            if (photoCollections[seriesId]) {
                openCarousel(seriesId, 0);
            } else {
                console.log(`Opening series: ${seriesId}`);
            }
        });
    });

    // Carousel event listeners
    if (carouselClose) {
        carouselClose.addEventListener('click', closeCarousel);
    }

    if (carouselOverlay) {
        carouselOverlay.addEventListener('click', closeCarousel);
    }

    if (carouselPrev) {
        carouselPrev.addEventListener('click', prevCarouselPhoto);
    }

    if (carouselNext) {
        carouselNext.addEventListener('click', nextCarouselPhoto);
    }
    
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
                prevPhoto();
                startPhotoRotation(); // Restart rotation
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextPhoto();
                startPhotoRotation(); // Restart rotation
            } else if (e.key === 'Enter') {
                e.preventDefault();
                // Enter key to navigate to current photo's series
                navigateToCurrentPhotoSeries();
            } else if (e.key === ' ') {
                e.preventDefault();
                // Spacebar to pause/resume rotation
                if (photoRotationInterval) {
                    stopPhotoRotation();
                    if (sectionIndicator) {
                        sectionIndicator.textContent = `Photo ${currentPhotoIndex + 1} of ${allPhotos.length} - Paused`;
                    }
                } else {
                    startPhotoRotation();
                    if (sectionIndicator) {
                        sectionIndicator.textContent = `Photo ${currentPhotoIndex + 1} of ${allPhotos.length}`;
                    }
                }
            }
        }
        
        // ESC key to go back to homepage from any page
        if (e.key === 'Escape') {
            e.preventDefault();
            if (carouselModal.classList.contains('active')) {
                closeCarousel();
            } else if (currentPage && currentPage.id !== 'homepage') {
                showPage('homepage');
            }
        }

        // Carousel navigation
        if (carouselModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevCarouselPhoto();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextCarouselPhoto();
            }
        }
    });
    
    // Initialize the page
    showPage('homepage');
    initializePhotoRotation(); // Initialize photo rotation on page load
}); 