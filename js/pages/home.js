// ============================================
// js/pages/home.js - Homepage Specific
// ============================================

/**
 * Homepage JavaScript
 * Handles: Testimonials slider, counter animation, video
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. TESTIMONIAL SLIDER
    // ==========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentIndex = 0;
    
    if (testimonialCards.length > 0 && prevBtn && nextBtn) {
        
        function showTestimonial(index) {
            testimonialCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
                card.setAttribute('role', 'tabpanel');
            });
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        }
        
        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(currentIndex);
        }
        
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);
        
        // Auto-slide every 5 seconds
        let autoSlide = setInterval(nextTestimonial, 5000);
        
        // Pause on hover
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
            slider.addEventListener('mouseleave', () => {
                autoSlide = setInterval(nextTestimonial, 5000);
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') prevTestimonial();
            if (e.key === 'ArrowRight') nextTestimonial();
        });
    }
    
    // ==========================================
    // 2. COUNTER ANIMATION
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        
        function animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            if (!target || isNaN(target)) return;
            
            let current = 0;
            const increment = Math.ceil(target / 60); // Animate over ~60 frames
            const duration = 2000; // 2 seconds
            const stepTime = Math.floor(duration / 60);
            
            function updateCounter() {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    return;
                }
                counter.textContent = current;
                setTimeout(updateCounter, stepTime);
            }
            
            updateCounter();
        }
        
        // Use Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        animateCounter(counter);
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            
            counters.forEach(counter => observer.observe(counter));
        } else {
            // Fallback for older browsers
            counters.forEach(counter => animateCounter(counter));
        }
    }
    
    // ==========================================
    // 3. VIDEO SHOWCASE
    // ==========================================
    const video = document.querySelector('.video-container video');
    if (video) {
        // Ensure video plays when visible
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.3 });
            
            videoObserver.observe(video);
        }
    }
    
});