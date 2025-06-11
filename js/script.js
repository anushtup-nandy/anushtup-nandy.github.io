document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Accessibility: Toggle aria-expanded attribute
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded); // if hidden, it's true
        });
    }
    
    // Close mobile menu when clicking a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    if (mobileMenu && mobileMenuLinks.length > 0) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if (mobileMenuButton) {
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Ensure it's a valid ID selector and not just "#"
            if (hrefAttribute && hrefAttribute.length > 1) {
                const targetElement = document.querySelector(hrefAttribute);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Optional: Update URL hash without page jump for better history/bookmarking
                    // if (history.pushState) {
                    //     history.pushState(null, null, hrefAttribute);
                    // } else {
                    //     location.hash = hrefAttribute;
                    // }

                    // Close mobile menu if open and it's a mobile link
                    if (mobileMenu && !mobileMenu.classList.contains('hidden') && this.closest('.mobile-menu')) {
                        mobileMenu.classList.add('hidden');
                        if (mobileMenuButton) {
                            mobileMenuButton.setAttribute('aria-expanded', 'false');
                        }
                        mobileMenu.setAttribute('aria-hidden', 'true');
                    }
                }
            }
        });
    });

    // Initialize ARIA attributes for mobile menu
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.setAttribute('aria-controls', 'mobile-menu-nav'); // Assuming mobileMenu div could have an id
        mobileMenu.setAttribute('id', 'mobile-menu-nav'); // Give mobile menu an id
        mobileMenu.setAttribute('aria-hidden', 'true');
    }
});