// Start as soon as DOM is ready (don't wait for images/fonts)
document.addEventListener('DOMContentLoaded', () => {
    // ---------- Custom Cursor ----------
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const interactive = document.querySelectorAll('a, button, .close-btn, .game-card');
    let cursorVisible = false;

    // Mobile detection – hide cursor on touch devices
    const isMobile = typeof window.orientation !== 'undefined' || navigator.maxTouchPoints > 0;
    if (isMobile) {
        // Ensure cursor stays hidden on mobile
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    } else {
        // Desktop – show cursor on first movement
        const mouseMoveHandler = (e) => {
            if (!cursorVisible) {
                cursor.style.opacity = '1';
                follower.style.opacity = '1';
                cursorVisible = true;
            }
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            // follower lags a bit
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        };
        document.addEventListener('mousemove', mouseMoveHandler);
    }

    // Hover effect for interactive elements (desktop only)
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (isMobile) return; // no hover on touch
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = 'var(--accent-color)';
        });
        el.addEventListener('mouseleave', () => {
            if (isMobile) return;
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = 'var(--text-color)';
        });
    });

    // ---------- Page Transition (subtle) ----------
    // Enter animation on page load
    requestAnimationFrame(() => {
        document.body.classList.add('page-enter');
        const cleanUp = () => {
            document.body.classList.remove('page-enter');
            document.body.removeEventListener('animationend', cleanUp);
        };
        document.body.addEventListener('animationend', cleanUp);
        // Fallback in case animationend doesn't fire
        setTimeout(cleanUp, 400);
    });

    // Intercept internal navigation links (excluding external & hash links)
    const internalLinks = document.querySelectorAll('a:not([target="_blank"])');
    internalLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#')) return; // let default behavior happen
            e.preventDefault();
            // Start exit animation
            document.body.classList.add('page-transition');
            const go = () => {
                window.location.href = href;
            };
            document.body.addEventListener('animationend', go, { once: true });
            // Fallback timeout
            setTimeout(go, 350);
        });
    });

    // ---------- Social Button Transition (external links) ----------
    const socialLinks = document.querySelectorAll('.social-btn[target="_blank"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const href = link.getAttribute('href');
            document.body.style.transition = 'transform 0.5s cubic-bezier(0.76,0,0.24,1), filter 0.5s, opacity 0.5s';
            document.body.style.transform = 'scale(0.95)';
            document.body.style.filter = 'blur(10px)';
            document.body.style.opacity = '0.5';
            setTimeout(() => {
                window.open(href, '_blank');
                // Reset after a short moment
                setTimeout(() => {
                    document.body.style.transform = 'scale(1)';
                    document.body.style.filter = 'blur(0px)';
                    document.body.style.opacity = '1';
                }, 100);
            }, 500);
        });
    });
});
