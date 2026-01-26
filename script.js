// Page Navigation System
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Page elements
    const pages = document.querySelectorAll('.page');
    const gridItems = document.querySelectorAll('.grid-item');
    
    // Grid navigation data
    let touchStartX = 0;
    let touchEndX = 0;

    function setInteractiveElement(element, onActivate, ariaLabel) {
        if (!element) return;
        element.style.cursor = 'pointer';
        element.setAttribute('role', 'button');
        element.setAttribute('tabindex', '0');
        if (ariaLabel) {
            element.setAttribute('aria-label', ariaLabel);
        }
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            onActivate();
        });
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onActivate();
            }
        });
    }
    
    // Page Navigation Functions
    function showPage(pageId) {
        // Add fade out effect to current page
        const currentActivePage = document.querySelector('.page.active');
        if (currentActivePage) {
            currentActivePage.style.transition = 'opacity 0.4s ease-out';
            currentActivePage.style.opacity = '0';
            
            // After fade out completes, switch pages
            setTimeout(() => {
                // Hide all pages
                pages.forEach(page => {
                    page.classList.remove('active');
                    page.style.opacity = '';
                    page.style.transition = '';
                });
                
                // Show target page with fade in
                const targetPage = document.getElementById(pageId);
                if (targetPage) {
                    targetPage.style.opacity = '0';
                    targetPage.classList.add('active');
                    
                    // Trigger fade in
                    setTimeout(() => {
                        targetPage.style.transition = 'opacity 0.4s ease-in';
                        targetPage.style.opacity = '1';
                        
                        // Clean up after animation
                        setTimeout(() => {
                            targetPage.style.transition = '';
                            targetPage.style.opacity = '';
                        }, 400);
                    }, 50);
                }
                
                // Handle body class for homepage scrolling
                if (pageId === 'homepage') {
                    document.body.classList.add('homepage-active');
                } else {
                    document.body.classList.remove('homepage-active');
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
            }, 400);
        } else {
            // No current page, just show target immediately (initial load)
            pages.forEach(page => page.classList.remove('active'));
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Handle other initialization logic
            if (pageId === 'homepage') {
                document.body.classList.add('homepage-active');
            } else {
                document.body.classList.remove('homepage-active');
            }
            
            navLinks.forEach(link => link.classList.remove('active'));
            const activeNavLink = document.querySelector(`[data-target="${pageId}"]`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }
            
            if (mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    }
    
    // Grid Navigation Functions
    function initializeGridNavigation() {
        gridItems.forEach((item) => {
            const target = item.getAttribute('data-target');
            const title = item.querySelector('.grid-item-content h2');
            const labelText = title ? title.textContent.trim() : '';
            if (target) {
                setInteractiveElement(
                    item,
                    () => showPage(target),
                    labelText ? `Open ${labelText}` : 'Open section'
                );
            }

            // Add hover effect to make it clear it's clickable
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Mobile Menu Functions
    function toggleMobileMenu() {
        mobileNav.classList.toggle('active');

        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute(
                'aria-expanded',
                mobileNav.classList.contains('active') ? 'true' : 'false'
            );
        }

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
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-controls', 'mobileNav');
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
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
    
    
    // Photo collections data
    const photoCollections = {
        'arte-mental': {
            title: 'Arte Mental',
            photos: [
                'series/artemental/ARTE1.jpg',
                'series/artemental/ARTE3.JPEG',
                'series/artemental/ARTE4.jpg',
                'series/artemental/ARTE5.JPEG',
                'series/artemental/ARTE6.jpg',
                'series/artemental/ARTE7.jpg',
                'series/artemental/ARTE8.JPEG',
                'series/artemental/ARTE9.jpg',
                'series/artemental/ARTE9.JPEG'
            ]
        },
        'analog-dreams': {
            title: 'Analog Dreams',
            photos: [
                'series/analogdreams/A63AE8AC-8344-417F-98C0-4DEBAA5C15E0.JPEG',
                'series/analogdreams/DSCF8917.JPG',
                'series/analogdreams/DSCF8874.JPG',
                'series/analogdreams/FA9DB80E-F9C4-43CE-8575-0F1F187AAF6A.JPG',
                'series/analogdreams/FD578689-AB37-4D9A-A7C2-2728013B4C10.JPG',
                'series/analogdreams/DSCF8852.JPG'
            ]
        },
        'beelenyc2024': {
            title: 'BEÉLENYC2024',
            photos: [
                'work/BEELENYC2024/DSCF5274-2.JPG',
                'work/BEELENYC2024/DSCF5398.JPG',
                'work/BEELENYC2024/DSCF5499.JPG',
                'work/BEELENYC2024/DSCF5562.JPG',
                'work/BEELENYC2024/DSCF5564.JPG',
                'work/BEELENYC2024/DSCF5611.JPG',
                'work/BEELENYC2024/DSCF5704.JPG',
                'work/BEELENYC2024/DSCF5742.JPG'
            ]
        },
        'oncenotes': {
            title: 'ONCENOTES',
            photos: [
                'work/ONCENOTES/copia-de-dscf3009-copia.jpg',
                'work/ONCENOTES/copia-de-dscf3017-copia.jpg',
                'work/ONCENOTES/copia-de-dscf7046.jpg',
                'work/ONCENOTES/copia-de-dscf7088.jpg',
                'work/ONCENOTES/copia-de-dscf7105.jpg',
                'work/ONCENOTES/copia-de-dscf8010.jpg',
                'work/ONCENOTES/copia-de-dscf8048.jpg',
                'work/ONCENOTES/copia-de-dscf9005-2-copia.jpg',
                'work/ONCENOTES/copia-de-dscf9008-2-copia.jpg',
                'work/ONCENOTES/dscf0005-copia.jpg'
            ]
        },
        'dannyocean': {
            title: 'DANNYOCEAN',
            photos: [
                'work/DANNYOCEAN/DSCF9136.JPG',
                'work/DANNYOCEAN/DSCF9141.JPG',
                'work/DANNYOCEAN/DSCF9334.JPG',
                'work/DANNYOCEAN/DSCF9349.JPG',
                'work/DANNYOCEAN/DSCF9478.JPG',
                'work/DANNYOCEAN/DSCF9640.JPG',
                'work/DANNYOCEAN/DSCF9866.JPG',
                'work/DANNYOCEAN/DSCF9875.jpg'
            ]
        },
        'newcurrencyxbrl': {
            title: 'NEWCURRENCYxBRL',
            photos: [
                'series/NEWCURRENCYxBRL/mainnewcurrency.JPG',
                'series/NEWCURRENCYxBRL/DSCF3293.JPG',
                'series/NEWCURRENCYxBRL/DSCF3370.JPG',
                'series/NEWCURRENCYxBRL/DSCF3405.jpg',
                'series/NEWCURRENCYxBRL/DSCF3550.JPG'
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


    // Carousel elements
    const carouselModal = document.getElementById('carouselModal');
    const carouselOverlay = document.getElementById('carouselOverlay');
    const carouselClose = document.getElementById('carouselClose');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselImage = document.getElementById('carouselImage');
    const carouselTitle = document.getElementById('carouselTitle');
    const carouselCounter = document.getElementById('carouselCounter');

    // Video modal elements
    const videoModal = document.getElementById('videoModal');
    const videoOverlay = document.getElementById('videoOverlay');
    const videoClose = document.getElementById('videoClose');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');

    let currentCollection = null;
    let currentCarouselIndex = 0;

    // Carousel functions
    function openCarousel(collectionId, startIndex = 0) {
        currentCollection = photoCollections[collectionId];
        if (!currentCollection) {
            return;
        }

        currentCarouselIndex = startIndex;
        updateCarouselImage();
        
        if (carouselModal) {
            carouselModal.classList.add('active');
            document.body.style.overflow = 'hidden';
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
    function initializeSeriesEventListeners() {
        const seriesPreviews = document.querySelectorAll('.series-preview');
        seriesPreviews.forEach(preview => {
            const seriesId = preview.getAttribute('data-series');
            const title = preview.querySelector('h2');
            const labelText = title ? title.textContent.replace(/"/g, '').trim() : '';
            if (photoCollections[seriesId]) {
                setInteractiveElement(
                    preview,
                    () => openCarousel(seriesId, 0),
                    labelText ? `Open series ${labelText}` : 'Open series'
                );
            }
        });
    }
    
    // Initialize series event listeners
    initializeSeriesEventListeners();

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
    
    // Touch/swipe support for carousel
    let carouselTouchStartX = 0;
    let carouselTouchEndX = 0;
    let carouselTouchStartY = 0;
    let carouselTouchEndY = 0;
    
    if (carouselImage) {
        carouselImage.addEventListener('touchstart', function(e) {
            carouselTouchStartX = e.changedTouches[0].screenX;
            carouselTouchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        carouselImage.addEventListener('touchend', function(e) {
            carouselTouchEndX = e.changedTouches[0].screenX;
            carouselTouchEndY = e.changedTouches[0].screenY;
            
            const deltaX = carouselTouchStartX - carouselTouchEndX;
            const deltaY = carouselTouchStartY - carouselTouchEndY;
            
            // Only trigger swipe if horizontal movement is greater than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Minimum swipe distance
                if (Math.abs(deltaX) > 50) {
                    if (deltaX > 0) {
                        // Swipe left - next photo
                        nextCarouselPhoto();
                    } else {
                        // Swipe right - previous photo
                        prevCarouselPhoto();
                    }
                }
            }
        }, { passive: true });
        
        // Prevent default touch behavior on carousel image
        carouselImage.addEventListener('touchmove', function(e) {
            e.preventDefault();
        });
    }
    
    // Mouse drag support for desktop
    let isDragging = false;
    let dragStartX = 0;
    
    if (carouselImage) {
        carouselImage.addEventListener('mousedown', function(e) {
            isDragging = true;
            dragStartX = e.clientX;
            carouselImage.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        carouselImage.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        carouselImage.addEventListener('mouseup', function(e) {
            if (!isDragging) return;
            
            const deltaX = dragStartX - e.clientX;
            
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    nextCarouselPhoto();
                } else {
                    prevCarouselPhoto();
                }
            }
            
            isDragging = false;
            carouselImage.style.cursor = 'grab';
        });
        
        carouselImage.addEventListener('mouseleave', function() {
            isDragging = false;
            carouselImage.style.cursor = 'grab';
        });
        
        // Set initial cursor
        carouselImage.style.cursor = 'grab';
    }
    
    // Film page functionality
    function initializeFilmEventListeners() {
        const filmPhotos = document.querySelectorAll('.film-photo');
        filmPhotos.forEach(photo => {
            const collectionId = photo.getAttribute('data-collection');
            const title = photo.querySelector('h3');
            const labelText = title ? title.textContent.replace(/"/g, '').trim() : '';
            if (collectionId && photoCollections[collectionId]) {
                setInteractiveElement(
                    photo,
                    () => openCarousel(collectionId, 0),
                    labelText ? `Open collection ${labelText}` : 'Open collection'
                );
            }
        });
    }
    
    // Initialize film event listeners
    initializeFilmEventListeners();
    
    function openVideoModal({ src, title, description }) {
        if (!videoModal || !videoPlayer) return;
        videoPlayer.src = src;
        videoPlayer.load();
        if (videoTitle) videoTitle.textContent = title || '';
        if (videoDescription) videoDescription.textContent = description || '';
        videoModal.classList.add('active');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        videoPlayer.play().catch(() => {});
    }

    function closeVideoModal() {
        if (!videoModal || !videoPlayer) return;
        videoPlayer.pause();
        videoPlayer.removeAttribute('src');
        videoPlayer.load();
        videoModal.classList.remove('active');
        videoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Video page functionality
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(video => {
        const src = video.getAttribute('data-video');
        const title = video.getAttribute('data-title') || '';
        const description = video.getAttribute('data-description') || '';
        if (src) {
            setInteractiveElement(
                video,
                () => openVideoModal({ src, title, description }),
                title ? `Play video ${title}` : 'Play video'
            );
        }
    });

    if (videoClose) {
        videoClose.addEventListener('click', closeVideoModal);
    }

    if (videoOverlay) {
        videoOverlay.addEventListener('click', closeVideoModal);
    }
    
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
        
        
        // ESC key to go back to homepage from any page
        if (e.key === 'Escape') {
            e.preventDefault();
            if (videoModal && videoModal.classList.contains('active')) {
                closeVideoModal();
            } else if (carouselModal.classList.contains('active')) {
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
    initializeGridNavigation(); // Initialize grid navigation
}); 