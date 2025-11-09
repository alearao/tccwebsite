// Newsletter form submission
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    window.location.href = `mailto:tcc@tufts.edu?subject=Newsletter%20Subscription&body=Email:%20${email}`;
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

// Initialize the number animation when the page loads
document.addEventListener('DOMContentLoaded', animateNumbers);