// Wait for all resources to load (fonts, images, etc.)
window.addEventListener('load', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .close-btn, .game-card');

    let cursorVisible = false;

    document.addEventListener('mousemove', (e) => {
        // Show cursor on first mouse movement
        if (!cursorVisible) {
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
            cursorVisible = true;
        }

        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Small delay for follower
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effect for links
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = 'var(--accent-color)';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = 'var(--text-color)';
        });
    });

    // Page Transition
    // Detect if coming from back navigation
    const isBackNavigation = sessionStorage.getItem('navigatingBack') === 'true';
    sessionStorage.removeItem('navigatingBack');

    // Add small delay to ensure everything is loaded and rendered
    setTimeout(() => {
        // Add enter animation on page load
        if (isBackNavigation) {
            document.body.classList.add('page-enter-back');
            setTimeout(() => {
                document.body.classList.remove('page-enter-back');
            }, 600);
        } else {
            document.body.classList.add('page-enter');
            setTimeout(() => {
                document.body.classList.remove('page-enter');
            }, 600);
        }
    }, 100); // Small delay to ensure rendering is complete

    // Intercept all internal links for smooth navigation
    const internalLinks = document.querySelectorAll('a:not([target="_blank"])');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only intercept if it's a local page
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();

                // Check if this is a back button
                const isBackBtn = link.classList.contains('back-btn');

                // Set flag for next page
                if (isBackBtn) {
                    sessionStorage.setItem('navigatingBack', 'true');
                    document.body.classList.add('page-transition-back');
                } else {
                    sessionStorage.removeItem('navigatingBack');
                    document.body.classList.add('page-transition');
                }

                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            }
        });
    });

    // Social Button Transition for External Links
    const socialLinks = document.querySelectorAll('.social-btn[target="_blank"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');

            // Add zoom out blur effect
            document.body.style.transition = 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1), filter 0.5s, opacity 0.5s';
            document.body.style.transform = 'scale(0.95)';
            document.body.style.filter = 'blur(10px)';
            document.body.style.opacity = '0.5';

            // Open link after animation
            setTimeout(() => {
                window.open(href, '_blank');

                // Reset styles
                setTimeout(() => {
                    document.body.style.transform = 'scale(1)';
                    document.body.style.filter = 'blur(0px)';
                    document.body.style.opacity = '1';
                }, 100);
            }, 500);
        });
    });
});
