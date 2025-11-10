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

// Client Testimonials Carousel
let currentClientSlide = 0;
const totalClientSlides = 2;

function showClientSlide(index) {
    const track = document.getElementById('clientTrack');
    const dots = document.querySelectorAll('.client-testimonials .dot');
    
    if (!track) return;
    
    // Update slide position
    track.style.transform = `translateX(-${index * 50}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentClientSlide = index;
}

function nextClientSlide() {
    const nextIndex = (currentClientSlide + 1) % totalClientSlides;
    showClientSlide(nextIndex);
}

function prevClientSlide() {
    const prevIndex = (currentClientSlide - 1 + totalClientSlides) % totalClientSlides;
    showClientSlide(prevIndex);
}

// Auto-advance client testimonials
let clientAutoTimer;

function startClientAuto() {
    clientAutoTimer = setInterval(nextClientSlide, 8000);
}

function stopClientAuto() {
    clearInterval(clientAutoTimer);
}

// Student Testimonials Carousel functionality
let currentTestimonialIndex = 0;
const totalTestimonials = 5;

function showTestimonial(index) {
    const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    
    if (!track) return;
    
    // Calculate the transform value (move by 20% for each slide since each slide is 20% wide)
    const translateX = -index * 20;
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    
    currentTestimonialIndex = index;
}

function nextTestimonial() {
    const nextIndex = (currentTestimonialIndex + 1) % totalTestimonials;
    showTestimonial(nextIndex);
}

function previousTestimonial() {
    const prevIndex = (currentTestimonialIndex - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(prevIndex);
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize number animation
    animateNumbers();
    
    // Initialize client testimonials carousel if on clients page
    const clientTrack = document.getElementById('clientTrack');
    if (clientTrack) {
        showClientSlide(0);
        startClientAuto();
        
        // Add event listeners
        const prevBtn = document.getElementById('clientPrev');
        const nextBtn = document.getElementById('clientNext');
        const dots = document.querySelectorAll('.client-testimonials .dot');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevClientSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextClientSlide);
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showClientSlide(index));
        });
        
        // Pause auto-advance on hover
        const carousel = document.querySelector('.client-testimonials');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopClientAuto);
            carousel.addEventListener('mouseleave', startClientAuto);
        }
    }

    // Initialize testimonials carousel if on students page
    const studentTrack = document.getElementById('carouselTrack');
    if (studentTrack) {
        showTestimonial(0);
        
        // Add event listeners for navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', previousTestimonial);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextTestimonial);
        }
        
        // Add event listeners for indicators
        const indicators = document.querySelectorAll('.carousel-indicators .indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showTestimonial(index));
        });
        
        // Add keyboard navigation for student testimonials
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                previousTestimonial();
            } else if (e.key === 'ArrowRight') {
                nextTestimonial();
            }
        });
    }
});

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