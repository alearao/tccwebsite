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
let currentStudentSlide = 0;
const totalStudentSlides = 5;

function showStudentSlide(index) {
    const track = document.getElementById('studentTrack');
    const dots = document.querySelectorAll('.student-testimonials .dot');
    
    if (!track) return;
    
    // Update slide position (20% for each slide since we have 5 slides)
    track.style.transform = `translateX(-${index * 20}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentStudentSlide = index;
}

function nextStudentSlide() {
    const nextIndex = (currentStudentSlide + 1) % totalStudentSlides;
    showStudentSlide(nextIndex);
}

function prevStudentSlide() {
    const prevIndex = (currentStudentSlide - 1 + totalStudentSlides) % totalStudentSlides;
    showStudentSlide(prevIndex);
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
    const studentTrack = document.getElementById('studentTrack');
    if (studentTrack) {
        showStudentSlide(0);
        
        // Add event listeners for navigation buttons
        const prevBtn = document.getElementById('studentPrev');
        const nextBtn = document.getElementById('studentNext');
        const dots = document.querySelectorAll('.student-testimonials .dot');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevStudentSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextStudentSlide);
        }
        
        // Add event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showStudentSlide(index));
        });
        
        // Add keyboard navigation for student testimonials
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevStudentSlide();
            } else if (e.key === 'ArrowRight') {
                nextStudentSlide();
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