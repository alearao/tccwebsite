// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            window.location.href = `mailto:tuftsconsultingcollectiveinfo@151208122.mailchimpapp.com?subject=Newsletter%20Subscription&body=Email:%20${email}`;
        });
    }
});

// Client Testimonials Carousel - Modern Implementation
class ClientCarousel {
    constructor() {
        this.currentIndex = 0;
        this.totalSlides = 2;
        this.track = document.getElementById('clientCarouselTrack');
        this.prevBtn = document.getElementById('clientPrevBtn');
        this.nextBtn = document.getElementById('clientNextBtn');
        this.indicators = document.querySelectorAll('.client-testimonials .indicator');
        this.autoplayInterval = null;

        if (!this.track) return;

        this.init();
    }

    init() {
        // Add click handlers for navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Add click handlers for indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Start autoplay
        this.startAutoplay();

        // Pause autoplay on hover
        const carousel = document.querySelector('.client-testimonials');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoplay());
            carousel.addEventListener('mouseleave', () => this.startAutoplay());
        }

        // Initialize first slide
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    updateCarousel() {
        // Update track position
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });

        // Update button states
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
        }
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            if (this.currentIndex < this.totalSlides - 1) {
                this.next();
            } else {
                this.goToSlide(0);
            }
        }, 8000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Student Testimonials Carousel - Modern Implementation
class StudentCarousel {
    constructor() {
        this.currentIndex = 0;
        this.totalSlides = 5;
        this.track = document.getElementById('studentCarouselTrack');
        this.prevBtn = document.getElementById('studentPrevBtn');
        this.nextBtn = document.getElementById('studentNextBtn');
        this.indicators = document.querySelectorAll('.student-testimonials .indicator');

        if (!this.track) return;

        this.init();
    }

    init() {
        // Add click handlers for navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Add click handlers for indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.track) return;
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Initialize first slide
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    updateCarousel() {
        // Update track position
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });

        // Update button states
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
        }
    }
}

// Initialize carousels when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize number animation
    animateNumbers();

    // Initialize client testimonials carousel
    new ClientCarousel();

    // Initialize student testimonials carousel
    new StudentCarousel();

    // Initialize teams gallery if on about page
    initializeTeamsGallery();
});

// Teams Gallery Carousel functionality
let currentTeamSlide = 0;
const totalTeamSlides = 5;

function showTeamSlide(index) {
    const track = document.getElementById('teamsTrack');
    const dotsContainer = document.getElementById('teamsDots');
    
    if (!track || !dotsContainer) return;
    
    // Ensure index is within bounds
    currentTeamSlide = Math.max(0, Math.min(index, totalTeamSlides - 1));
    
    // Calculate transform - move by 20% for each slide (each photo is 20% of track width)
    const translateX = -(currentTeamSlide * 20);
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    updateTeamDots();
}

function updateTeamDots() {
    const dotsContainer = document.getElementById('teamsDots');
    if (!dotsContainer) return;
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create dots for all 5 slides
    for (let i = 0; i < totalTeamSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'gallery-dot';
        dot.setAttribute('data-slide', i);
        if (i === currentTeamSlide) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => showTeamSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function nextTeamSlide() {
    const nextIndex = (currentTeamSlide + 1) % totalTeamSlides;
    showTeamSlide(nextIndex);
}

function prevTeamSlide() {
    const prevIndex = (currentTeamSlide - 1 + totalTeamSlides) % totalTeamSlides;
    showTeamSlide(prevIndex);
}

function initializeTeamsGallery() {
    const teamsTrack = document.getElementById('teamsTrack');
    if (teamsTrack) {
        // Initialize carousel
        showTeamSlide(0);
        
        // Add event listeners for navigation buttons
        const prevBtn = document.getElementById('teamsPrev');
        const nextBtn = document.getElementById('teamsNext');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevTeamSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextTeamSlide);
        }
        
        // Auto-slide functionality
        let autoSlideInterval = setInterval(() => {
            nextTeamSlide();
        }, 5000); // Change slide every 5 seconds
        
        // Pause auto-slide on hover
        const gallery = document.querySelector('.teams-gallery');
        if (gallery) {
            gallery.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            gallery.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    nextTeamSlide();
                }, 5000);
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (teamsTrack && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                if (e.key === 'ArrowLeft') {
                    prevTeamSlide();
                } else if (e.key === 'ArrowRight') {
                    nextTeamSlide();
                }
            }
        });
    }
}

// Number counting animation
function animateNumbers() {
    const numbers = document.querySelectorAll('.number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const finalNumber = parseInt(numberElement.textContent.replace('+', ''));
                
                // Reset to 0 before animating
                numberElement.textContent = '0' + (numberElement.textContent.includes('+') ? '+' : '');
                
                let currentNumber = 0;
                const increment = finalNumber / 50; // 50 steps for smooth animation
                const duration = 2000; // 2 seconds
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        currentNumber = finalNumber;
                        clearInterval(timer);
                    }
                    
                    // Update the display
                    const displayNumber = Math.floor(currentNumber);
                    numberElement.textContent = displayNumber + (numberElement.textContent.includes('+') ? '+' : '');
                }, stepTime);
                
                // Stop observing this element after animation starts
                observer.unobserve(numberElement);
            }
        });
    }, { threshold: 0.5 });
    
    numbers.forEach(number => {
        observer.observe(number);
    });
}