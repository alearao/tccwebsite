// Newsletter form submission
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    window.location.href = `mailto:tuftsconsultingcollectiveinfo@151208122.mailchimpapp.com?subject=Newsletter%20Subscription&body=Email:%20${email}`;
});

// Carousel functionality
let currentSlideIndex = 0;
const totalSlides = 2;

function showSlide(index) {
    const track = document.getElementById('testimonial-track');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track) return;
    
    // Update slide position
    track.style.transform = `translateX(-${index * 50}%)`;
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    
    currentSlideIndex = index;
}

function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(nextIndex);
}

function previousSlide() {
    const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
}

function currentSlide(index) {
    showSlide(index - 1);
}

// Auto-advance carousel every 7 seconds
let autoSlideTimer;

function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 7000);
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize number animation
    animateNumbers();
    
    // Initialize carousel
    showSlide(0);
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause auto-slide on hover
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
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