// Mobile menu toggle
const toggleBtn = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = toggleBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Counter animation for stats
const counters = document.querySelectorAll('.counter');
const speed = 200;
const startCounting = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Trigger counters when stats section is in view
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
}

// Testimonial slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');

const showTestimonial = (index) => {
    testimonials.forEach((t, i) => {
        t.classList.remove('active');
        if (i === index) t.classList.add('active');
    });
};

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
}

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
if (filterBtns.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Contact forms handling
const contactForm = document.getElementById('mainContactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const status = document.getElementById('contactStatus');
        status.style.display = 'block';
        status.innerText = 'Thank you! We will contact you soon.';
        contactForm.reset();
        setTimeout(() => status.style.display = 'none', 5000);
    });
}

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks for subscribing!');
        newsletterForm.reset();
    });
}
const newsletterForm2 = document.getElementById('newsletterForm2');
if (newsletterForm2) {
    newsletterForm2.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks for subscribing!');
        newsletterForm2.reset();
    });
}

// ========== ADDED VIDEO ENHANCEMENTS ==========
// Get the main showcase video (assuming one video with .video-container video)
const videoElement = document.querySelector('.video-container video');
if (videoElement) {
    // Ensure the video is muted to allow autoplay on most browsers
    videoElement.muted = true;
    
    // Optional: attempt to play on page load (autoplay is already in HTML,
    // but this ensures it starts even if the browser blocked it)
    videoElement.play().catch(e => console.log('Autoplay was prevented:', e));
    
    // Pause video when it scrolls out of view, play when in view
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                videoElement.play().catch(e => console.log('Play on view failed:', e));
            } else {
                videoElement.pause();
            }
        });
    }, { threshold: 0.5 }); // 50% visible triggers play/pause
    
    videoObserver.observe(videoElement);
    
    // Optional: if you want to stop video fully when page hidden (save resources)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            videoElement.pause();
        } else if (videoElement.getAttribute('data-observed-playing') !== 'false') {
            // Resume only if it was playing before (simple logic)
            const container = videoElement.closest('.video-container');
            if (container && container.getBoundingClientRect().top < window.innerHeight) {
                videoElement.play().catch(e => console.log('Resume failed:', e));
            }
        }
    });
}
// ========== END VIDEO ENHANCEMENTS ==========