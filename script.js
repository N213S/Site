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
