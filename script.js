/* ============================================
   Nitin Yadav Portfolio — Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on section
        updateActiveNavLink();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Back to top ──
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── Active nav link ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ── Mobile navigation ──
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('open');
        document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close mobile nav on outside click
    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ── Scroll animations (Intersection Observer) ──
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;

                setTimeout(() => {
                    el.classList.add('animate-in');
                }, parseInt(delay));

                animationObserver.unobserve(el);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => animationObserver.observe(el));

    // ── Contact form ──
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Button loading state
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                <path d="M12 2a10 10 0 0 1 10 10"/>
            </svg>
            Sending...
        `;
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate sending
        setTimeout(() => {
            submitBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Message Sent!
            `;
            submitBtn.style.opacity = '1';
            submitBtn.style.background = '#16a34a';
            submitBtn.style.borderColor = '#16a34a';

            // Reset form
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
            }, 2500);
        }, 1500);
    });

    // ── Smooth anchor scrolling ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Parallax on hero image ──
    const heroImg = document.querySelector('.hero-profile-wrapper');
    if (heroImg && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            heroImg.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    }

    // Add spin keyframe dynamically for loading button
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
});
