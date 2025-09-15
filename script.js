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
        gridItems.forEach(item => {
            item.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                if (target) {
                    showPage(target);
                }
            });
        });
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
                'work/BEÉLENYC2024/DSCF5274-2.JPG',
                'work/BEÉLENYC2024/DSCF5398.JPG',
                'work/BEÉLENYC2024/DSCF5499.JPG',
                'work/BEÉLENYC2024/DSCF5562.JPG',
                'work/BEÉLENYC2024/DSCF5564.JPG',
                'work/BEÉLENYC2024/DSCF5611.JPG',
                'work/BEÉLENYC2024/DSCF5704.JPG',
                'work/BEÉLENYC2024/DSCF5742.JPG'
            ]
        },
        'oncenotes': {
            title: 'ONCENOTES',
            photos: [
                'work/ONCENOTES/Copia de DSCF3009 copia.jpg',
                'work/ONCENOTES/Copia de DSCF3017 copia.jpg',
                'work/ONCENOTES/Copia de DSCF7046.jpg',
                'work/ONCENOTES/Copia de DSCF7088.jpg',
                'work/ONCENOTES/Copia de DSCF7105.jpg',
                'work/ONCENOTES/Copia de DSCF8010.jpg',
                'work/ONCENOTES/Copia de DSCF8048.jpg',
                'work/ONCENOTES/Copia de DSCF9005-2 copia.jpg',
                'work/ONCENOTES/Copia de DSCF9008-2 copia.jpg',
                'work/ONCENOTES/DSCF0005 copia.jpg'
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
                'series/NEWCURRENCYxBRL/DSCF3293.JPG',
                'series/NEWCURRENCYxBRL/DSCF3319.JPG',
                'series/NEWCURRENCYxBRL/DSCF3370.JPG',
                'series/NEWCURRENCYxBRL/DSCF3405.jpg',
                'series/NEWCURRENCYxBRL/DSCF3421.jpg',
                'series/NEWCURRENCYxBRL/DSCF3550.JPG',
                'series/NEWCURRENCYxBRL/DSCF3562.JPG'
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
    initializeGridNavigation(); // Initialize grid navigation
}); 