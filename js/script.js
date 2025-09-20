document.addEventListener('DOMContentLoaded', () => {
    // ==============================================
    // THEME TOGGLE LOGIC
    // ==============================================
    const injectThemeToggle = () => {
        const navContainer = document.querySelector('.hidden.md\\:flex.items-center');
        if (!navContainer) return;

        const toggleButton = document.createElement('button');
        toggleButton.id = 'theme-toggle';
        toggleButton.className = 'ml-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors';
        toggleButton.innerHTML = `
            <i class="fas fa-sun text-lg"></i>
            <i class="fas fa-moon text-lg hidden"></i>
        `;
        
        // Find the correct location - after the last link
        const lastNavLink = navContainer.querySelector('a:last-of-type');
        if (lastNavLink) {
            lastNavLink.parentNode.insertBefore(toggleButton, lastNavLink.nextSibling);
        } else {
             navContainer.appendChild(toggleButton);
        }

        const sunIcon = toggleButton.querySelector('.fa-sun');
        const moonIcon = toggleButton.querySelector('.fa-moon');
        const htmlEl = document.documentElement;

        const setTheme = (theme) => {
            htmlEl.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            if (theme === 'dark') {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        };

        toggleButton.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });

        // Initialize theme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    };
    
    injectThemeToggle();

    // ==============================================
    // POINTER LIGHT EFFECT
    // ==============================================
    const pointerLight = document.createElement('div');
    pointerLight.id = 'pointer-light';
    document.body.appendChild(pointerLight);

    window.addEventListener('mousemove', (e) => {
        pointerLight.style.left = `${e.clientX}px`;
        pointerLight.style.top = `${e.clientY}px`;
    });
    
    // ==============================================
    // PROJECT CARD HOVER EFFECT
    // ==============================================
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==============================================
    // MOBILE MENU & NAVIGATION
    // ==============================================
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add scrolled class to nav on scroll
    const nav = document.querySelector('nav.fixed');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    });

    // ==============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ==============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .project-card, #experience > div > div > div').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
    
    // ==============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ==============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});