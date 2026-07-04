// ============================================
// js/script.js - Shared Core Functionality
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    setFooterYear();
    initFloatingButtons();
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
        const isOpen = navMenu.classList.contains('active');
        isOpen ? closeMenu() : openMenu();
    };

    toggleBtn.addEventListener('click', toggleMenu);

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on ESC key
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
// 3. FLOATING BUTTONS TRACKING
// ==========================================
function initFloatingButtons() {
    const buttons = document.querySelectorAll(
        '.social-float, .whatsapp-float, .shopping-float'
    );

    if (!buttons.length) return;

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const label = btn.getAttribute('aria-label') || 'floating-button';
            console.log(`[GFC TRACK] Clicked: ${label}`);
        });
    });
}