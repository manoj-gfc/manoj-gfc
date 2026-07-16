// ============================================
// js/scipt.js - Shared Core Functionality
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    setFooterYear();
    initFloatingButtons();

    // Premium Features
    initStickyHeader();
    initActiveNavigation();
    initScrollReveal();
});

// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================
function initMobileNav() {
    const toggleBtn = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (!toggleBtn || !navMenu) return;

    const icon = toggleBtn.querySelector('i');

    const openMenu = () => {
        navMenu.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
        if (icon) icon.className = 'fas fa-times';
    };

    const closeMenu = () => {
        navMenu.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        if (icon) icon.className = 'fas fa-bars';
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        navMenu.classList.contains('active') ? closeMenu() : openMenu();
    };

    toggleBtn.addEventListener('click', toggleMenu);

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
}

// ==========================================
// 2. FOOTER YEAR AUTO UPDATE
// ==========================================
function setFooterYear() {
    const yearEl = document.getElementById('year');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// ==========================================
// 3. FLOATING BUTTON TRACKING
// ==========================================
function initFloatingButtons() {
    const buttons = document.querySelectorAll(
        '.social-float, .whatsapp-float, .shopping-float'
    );

    if (!buttons.length) return;

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const label =
                btn.getAttribute('aria-label') || 'floating-button';

            console.log(`[GFC TRACK] Clicked: ${label}`);
        });
    });
}

// ==========================================
// 4. STICKY HEADER
// ==========================================
function initStickyHeader() {
    const header = document.querySelector('.navbar');

    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
        passive: true
    });
}

// ==========================================
// 5. ACTIVE NAVIGATION
// ==========================================
function initActiveNavigation() {
    const links = document.querySelectorAll('.nav-menu a');

    if (!links.length) return;

    const currentPath = window.location.pathname;

    links.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        if (link.pathname === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// ==========================================
// 6. SCROLL REVEAL ANIMATION
// ==========================================
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');

    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        elements.forEach((el) => observer.observe(el));
    } else {
        elements.forEach((el) => el.classList.add('active'));
    }
}