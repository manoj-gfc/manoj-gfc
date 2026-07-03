/**
 * BLOG.JS - Blog page specific functionality
 * File: js/pages/blog.js
 * Loads on: blog.html ONLY
 * 
 * Note: blog.html is a fully static page displaying blog posts.
 * All shared functionality (navigation, footer, floating buttons)
 * is handled by main.js
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. PAGE INITIALIZATION
    // ==========================================
    console.log('[GFC] Blog page loaded successfully');
    
    // ==========================================
    // 2. BLOG POST CARD INTERACTIONS
    // ==========================================
    const blogPosts = document.querySelectorAll('.blog-post, .blog-card');
    
    if (blogPosts.length > 0) {
        blogPosts.forEach(function(post) {
            // Make entire blog post card clickable
            const link = post.querySelector('a');
            if (link) {
                post.style.cursor = 'pointer';
                post.addEventListener('click', function(e) {
                    // If click is not directly on the link, trigger the link
                    if (!e.target.closest('a')) {
                        link.click();
                    }
                });
            }
            
            // Track blog post views (optional analytics)
            post.addEventListener('mouseenter', function() {
                const title = this.querySelector('h3')?.textContent || 'Unknown Post';
                console.log('[GFC] Blog post viewed:', title);
            });
        });
    }
    
    // ==========================================
    // 3. READING TIME ESTIMATOR (Optional Enhancement)
    // ==========================================
    const blogContent = document.querySelector('.blog-post-detail, .blog-content, .post-content');
    if (blogContent) {
        const text = blogContent.textContent || '';
        const words = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute
        
        // Add reading time badge if not already present
        const header = document.querySelector('.page-header .container, .blog-header .container');
        if (header && !document.querySelector('.reading-time')) {
            const timeBadge = document.createElement('p');
            timeBadge.className = 'reading-time';
            timeBadge.style.cssText = 'color: #c49a6c; font-size: 0.9rem; margin-top: 0.5rem;';
            timeBadge.innerHTML = '📖 ' + readingTime + ' min read';
            header.appendChild(timeBadge);
        }
    }
    
    // ==========================================
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
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
    // 5. OPTIONAL: BLOG CARD ANIMATION ON SCROLL
    // ==========================================
    if ('IntersectionObserver' in window) {
        const animateCards = document.querySelectorAll('.blog-post, .blog-card');
        
        if (animateCards.length > 0) {
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
    }
    
    // ==========================================
    // 6. SEARCH/FILTER FUNCTIONALITY (Optional)
    // ==========================================
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const posts = document.querySelectorAll('.blog-post, .blog-card');
            
            posts.forEach(function(post) {
                const title = post.querySelector('h3')?.textContent?.toLowerCase() || '';
                const description = post.querySelector('p')?.textContent?.toLowerCase() || '';
                const matches = title.includes(query) || description.includes(query);
                post.style.display = matches || query === '' ? 'block' : 'none';
            });
        });
    }
    
    // ==========================================
    // 7. CATEGORY FILTER (Optional)
    // ==========================================
    const categoryBtns = document.querySelectorAll('.category-filter');
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryBtns.forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                const category = this.getAttribute('data-category') || 'all';
                const posts = document.querySelectorAll('.blog-post, .blog-card');
                
                posts.forEach(function(post) {
                    const postCategory = post.getAttribute('data-category') || 'general';
                    post.style.display = (category === 'all' || postCategory === category) ? 'block' : 'none';
                });
            });
        });
    }
    
});