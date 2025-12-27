// ========================================
// MOBILE MENU TOGGLE
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');

        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================

const heroImage = document.querySelector('.hero-image');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            if (heroImage) {
                heroImage.style.transform = `scale(1.05) translateY(${scrolled * parallaxSpeed}px)`;
            }

            ticking = false;
        });

        ticking = true;
    }
});

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing after reveal
            // observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(element => {
    revealOnScroll.observe(element);
});

// ========================================
// ENHANCED HOVER EFFECTS
// ========================================

// Add subtle cursor tracking for CTA button
const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    ctaButton.addEventListener('mousemove', (e) => {
        const rect = ctaButton.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctaButton.style.setProperty('--mouse-x', `${x}px`);
        ctaButton.style.setProperty('--mouse-y', `${y}px`);
    });
}

// ========================================
// PERFORMANCE: LAZY LOAD IMAGES
// ========================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.loading = 'lazy';
        }
    });
} else {
    // Fallback for browsers that don't support native lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========================================
// SMOOTH SCROLL POLYFILL (for older browsers)
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// HEADER BACKGROUND ON SCROLL
// ========================================

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(5, 5, 5, 0.95)';
    } else {
        header.style.backgroundColor = 'rgba(5, 5, 5, 0.8)';
    }

    lastScroll = currentScroll;
});

// ========================================
// BOOKING MODAL
// ========================================

const bookingModal = document.getElementById('bookingModal');
const openModalButton = document.getElementById('openBookingModal');
const closeModalButton = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');

// Open modal
if (openModalButton) {
    openModalButton.addEventListener('click', (e) => {
        e.preventDefault();
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
}

// Close modal
const closeModal = () => {
    bookingModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
};

if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

// Close modal when clicking outside content
bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        closeModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
        closeModal();
    }
});

// Handle form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(bookingForm);
        const service = formData.get('service');
        const date = formData.get('date');
        const time = formData.get('time');
        const name = formData.get('name');
        const phone = formData.get('phone');

        // Log booking (in production, send to backend)
        console.log('Booking Request:', { service, date, time, name, phone });

        // Show success message
        const modalContent = document.querySelector('.modal-content');
        const originalContent = modalContent.innerHTML;

        modalContent.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; text-align: center;">
                <h2 class="modal-title" style="margin-bottom: 1rem;">VIELEN DANK!</h2>
                <p class="body-text">Wir rufen zurück.</p>
            </div>
        `;

        // Close modal and reset after 2 seconds
        setTimeout(() => {
            closeModal();
            setTimeout(() => {
                modalContent.innerHTML = originalContent;
                bookingForm.reset();

                // Re-attach event listeners after restoring content
                const newCloseButton = document.getElementById('closeModal');
                if (newCloseButton) {
                    newCloseButton.addEventListener('click', closeModal);
                }
            }, 300);
        }, 2000);
    });
}

// ========================================
// CONSOLE SIGNATURE
// ========================================

console.log('%c BILK BARBERS ', 'background: #050505; color: #f0f0f0; font-size: 24px; font-weight: bold; padding: 10px 20px; letter-spacing: 5px;');
console.log('%c Präzision. Handwerk. Unterbilk. ', 'background: #f0f0f0; color: #050505; font-size: 12px; padding: 5px 10px; letter-spacing: 2px;');
