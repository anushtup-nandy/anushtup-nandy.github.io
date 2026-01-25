document.addEventListener('DOMContentLoaded', () => {

    // ==============================================
    // THEME TOGGLE
    // ==============================================
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
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

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Initialize theme based on preference or saved value
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    // ==============================================
    // CURSOR GLOW EFFECT
    // ==============================================
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
            });
        });
    }
    
    // ==============================================
    // CATEGORY FILTERING
    // ==============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter cards with smooth animation
            projectCards.forEach((card, index) => {
                const cardCategories = card.dataset.category.split(' ');
                const shouldShow = category === 'all' || cardCategories.includes(category);
                
                if (shouldShow) {
                    card.classList.remove('hidden', 'filtering-out');
                    card.classList.add('filtering-in');
                    card.style.animationDelay = `${index * 0.05}s`;
                } else {
                    card.classList.add('filtering-out');
                    setTimeout(() => {
                        card.classList.add('hidden');
                        card.classList.remove('filtering-out');
                    }, 300);
                }
            });
        });
    });

    // ==============================================
    // PROJECT CARD HOVER EFFECT (Enhanced)
    // ==============================================
    let rafId = null;
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (rafId) cancelAnimationFrame(rafId);
            
            rafId = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
                
                // Subtle 3D tilt effect
                const tiltX = ((y - 50) / 50) * 2; // ±2deg
                const tiltY = ((x - 50) / 50) * -2; // ±2deg
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${tiltX}deg) 
                    rotateY(${tiltY}deg) 
                    translateY(-12px) 
                    scale(1.02)
                `;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            if (rafId) cancelAnimationFrame(rafId);
            card.style.transform = '';
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });

    // ==============================================
    // HEADER SCROLL & MOBILE MENU
    // ==============================================
    const header = document.querySelector('header');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // ==============================================
    // SCROLL FADE-IN ANIMATIONS
    // ==============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ==============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ==============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
});
