/**
 * SERVICES.JS - Services page specific functionality
 * File: js/pages/services.js
 * Loads on: services.html ONLY
 * 
 * Note: services.html is a fully static page.
 * All shared functionality (navigation, footer, floating buttons)
 * is handled by main.js
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. PAGE INITIALIZATION
    // ==========================================
    console.log('[GFC] Services page loaded successfully');
    
    // ==========================================
    // 2. SERVICE CARD INTERACTIONS (Optional Enhancement)
    // ==========================================
    const serviceCards = document.querySelectorAll('.service-item, .service-card');
    
    if (serviceCards.length > 0) {
        serviceCards.forEach(function(card) {
            // Add subtle hover tracking for analytics (optional)
            card.addEventListener('mouseenter', function() {
                const serviceName = this.querySelector('h3')?.textContent || 'Unknown Service';
                console.log('[GFC] Service viewed:', serviceName);
            });
            
            // Make entire card clickable if there's a link inside
            const link = card.querySelector('a');
            if (link) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', function(e) {
                    // If click is not directly on the link, trigger the link
                    if (!e.target.closest('a')) {
                        link.click();
                    }
                });
            }
        });
    }
    
    // ==========================================
    // 3. SMOOTH SCROLL FOR ANCHOR LINKS (if any)
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ==========================================
    // 4. OPTIONAL: SERVICE CARD ANIMATION ON SCROLL
    // ==========================================
    if ('IntersectionObserver' in window) {
        const animateCards = document.querySelectorAll('.service-item, .service-card');
        
        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateCards.forEach(function(card, index) {
            // Set initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.transitionDelay = (index * 0.1) + 's';
            
            cardObserver.observe(card);
        });
    }
    
});