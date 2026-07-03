// ============================================
// js/pages/contact.js - Contact Page Specific
// ============================================

/**
 * Contact Page JavaScript
 * Handles: Form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. CONTACT FORM HANDLING
    // ==========================================
    const contactForm = document.querySelector('.form-wrapper form');
    
    if (contactForm) {
        
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const mobile = document.getElementById('mobile');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Basic validation
            if (name && name.value.trim() === '') {
                isValid = false;
                name.style.borderColor = '#dc3545';
            } else if (name) {
                name.style.borderColor = '';
            }
            
            if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                isValid = false;
                email.style.borderColor = '#dc3545';
            } else if (email) {
                email.style.borderColor = '';
            }
            
            if (mobile && !mobile.value.match(/^[0-9]{10}$/)) {
                isValid = false;
                mobile.style.borderColor = '#dc3545';
            } else if (mobile) {
                mobile.style.borderColor = '';
            }
            
            if (message && message.value.trim() === '') {
                isValid = false;
                message.style.borderColor = '#dc3545';
            } else if (message) {
                message.style.borderColor = '';
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all fields correctly.');
            }
        });
        
        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = '';
                }
            });
            input.addEventListener('focus', function() {
                this.style.borderColor = '#c49a6c';
            });
        });
    }
    
});