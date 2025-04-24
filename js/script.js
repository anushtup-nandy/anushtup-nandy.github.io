// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Check if both button and menu exist to prevent errors
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle the 'hidden' class provided by TailwindCSS
            mobileMenu.classList.toggle('hidden');

            // Optional: Toggle ARIA attributes for accessibility
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded); // Note: 'hidden' class usually suffices for screen readers
        });

        // --- Close Mobile Menu When a Link is Clicked ---
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Hide the menu when a link inside it is clicked
                mobileMenu.classList.add('hidden');
                // Reset ARIA attribute on button
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
    } else {
        console.warn("Mobile menu button or menu element not found.");
    }


    // --- Smooth Scrolling for Navigation Links ---
    // Select all anchor links whose href attribute starts with '#'
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent the default anchor link behavior (instant jump)
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Check if the target element exists on the page
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Enable smooth scrolling animation
                    block: 'start'      // Align the top of the target element to the top of the viewport
                });

                // Optional: Update URL hash without page jump (improves accessibility and history)
                // history.pushState(null, null, targetId);
            } else {
                console.warn(`Smooth scroll target element not found for selector: ${targetId}`);
            }
        });
    });

    // Optional: Dynamic Year in Footer
    const yearSpan = document.querySelector('footer p span.year'); // Add a <span class="year"> if you want this
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    // Or directly target the paragraph if you don't add a span:
    const copyrightPara = document.querySelector('footer p[data-copyright]'); // Add data-copyright attribute to the p tag
    if (copyrightPara) {
         copyrightPara.textContent = `© ${new Date().getFullYear()} Anushtup Nandy. All rights reserved.`;
    } else {
        // Fallback if you don't want to modify the HTML for this:
        const footerCopy = document.querySelector('footer .max-w-6xl > div:last-child > p:first-child');
         if (footerCopy && footerCopy.textContent.includes('©')) {
            footerCopy.textContent = footerCopy.textContent.replace(/© \d{4}/, `© ${new Date().getFullYear()}`);
        }
    }

}); // End DOMContentLoaded