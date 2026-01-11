// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (hamburger && navMenu) {
        // Toggle menu
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
            
            // Prevent body scroll when menu is open
            if (isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe portfolio items and blog posts
    const fadeElements = document.querySelectorAll('.portfolio-item, .blog-post');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Latest YouTube Video Fetcher
    const videoContainer = document.getElementById('latest-video-player');
    
    if (videoContainer) {
        // REPLACE THIS WITH YOUR CHANNEL ID
        // You can find it in your YouTube Studio URL or source code
        const CHANNEL_ID = 'UCsA-TlQxgvxeX_-CYru0iQQ'; 
        const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

        async function loadLatestVideo() {
            try {
                const response = await fetch(RSS_URL);
                const data = await response.json();
                
                if (data.status === 'ok' && data.items && data.items.length > 0) {
                    const latestVideo = data.items[0];
                    // Extract video ID from guid (yt:video:VIDEO_ID)
                    const videoId = latestVideo.guid.split(':')[2];
                    
                    videoContainer.innerHTML = `
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/${videoId}" 
                            title="${latestVideo.title}"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    `;
                } else {
                    console.log('No videos found or API error');
                }
            } catch (error) {
                console.error('Error fetching latest video:', error);
                videoContainer.innerHTML = '<div class="video-placeholder">Check out my YouTube channel!</div>';
            }
        }

        // Only load if CHANNEL_ID is set
        if (CHANNEL_ID !== 'YOUR_CHANNEL_ID_HERE') {
            loadLatestVideo();
        } else {
            console.warn('Please set your YouTube Channel ID in script.js to enable the latest video feature.');
            videoContainer.innerHTML = '<div class="video-placeholder">Please configure YouTube Channel ID in script.js</div>';
        }
    }
});

// Contact Notification
document.addEventListener('DOMContentLoaded', function() {
    const contactLinks = document.querySelectorAll('a[href^="mailto:"]');

    if (contactLinks.length > 0) {
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // We let the default mail action happen (e.preventDefault() is NOT called)
                // We just show the confirmation
                showNotification();
            });
        });
    }

    function showNotification() {
        // Remove existing notification if any
        const existing = document.querySelector('.notification-popup');
        if (existing) {
            existing.remove();
        }

        // Detect language
        const isFrench = document.documentElement.lang === 'fr';
        const message = isFrench ? 'Vérifiez votre boîte mail' : 'Check your inbox';

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification-popup';
        notification.textContent = message;
        
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            
            // Remove from DOM after fade out animation
            notification.addEventListener('animationend', () => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            });
        }, 3000);
    }
});
