// Enhanced Main JavaScript file for NOMED website

// Global NOMED object
window.NOMED = {
    // Configuration
    config: {
        animationDuration: 300,
        scrollOffset: 80,
        notificationDuration: 5000
    },
    
    // State management
    state: {
        isScrolling: false,
        currentSection: 'home',
        mobileMenuOpen: false
    }
};

// Enhanced smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight - NOMED.config.scrollOffset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update current section
            NOMED.state.currentSection = this.getAttribute('href').substring(1);
        }
    });
});

// Enhanced Intersection Observer with staggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple elements
            setTimeout(() => {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.style.opacity = '1';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Dynamic navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white', 'shadow-lg', 'backdrop-blur-sm');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-white', 'shadow-lg', 'backdrop-blur-sm');
            navbar.classList.add('bg-transparent');
        }
    }
});

// Contact form handler with enhanced validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('border-red-500')) {
                    validateField(this);
                }
            });
        });
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                NOMED.showNotification('Por favor, corrige los errores en el formulario', 'error');
                return;
            }
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            try {
                NOMED.setButtonLoading(submitButton, true);
                
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    NOMED.showNotification('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
                    contactForm.reset();
                    // Remove validation classes
                    inputs.forEach(input => {
                        input.classList.remove('border-red-500', 'border-green-500');
                    });
                } else {
                    NOMED.showNotification(result.message || 'Error al enviar el mensaje', 'error');
                }
                
            } catch (error) {
                console.error('Error:', error);
                NOMED.showNotification('Error de conexión. Inténtalo de nuevo.', 'error');
            } finally {
                NOMED.setButtonLoading(submitButton, false);
            }
        });
    }
});

// Enhanced field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous validation classes
    field.classList.remove('border-red-500', 'border-green-500');
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${fieldName} es requerido`;
    }
    
    // Email validation
    if (fieldName === 'email' && value && !NOMED.utils.isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Email inválido';
    }
    
    // Length validation
    if (fieldName === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    if (isValid) {
        field.classList.add('border-green-500');
    } else {
        field.classList.add('border-red-500');
    }
    
    return isValid;
}

// Enhanced notification system
NOMED.showNotification = function(message, type = 'info', duration = NOMED.config.notificationDuration) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ';
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <span class="text-lg">${icon}</span>
            <span class="flex-1">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
};

// Loading states for buttons
NOMED.setButtonLoading = function(button, loading = true) {
    if (loading) {
        button.dataset.originalText = button.textContent;
        button.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando...
        `;
        button.disabled = true;
        button.classList.add('opacity-75', 'cursor-not-allowed');
    } else {
        button.textContent = button.dataset.originalText || 'Enviar';
        button.disabled = false;
        button.classList.remove('opacity-75', 'cursor-not-allowed');
    }
};

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('blur-sm', 'opacity-50');
            img.classList.add('opacity-100');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    img.classList.add('blur-sm', 'opacity-50');
    imageObserver.observe(img);
});

// Typing animation for text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animations
document.querySelectorAll('[data-typing]').forEach(element => {
    const text = element.dataset.typing;
    typeWriter(element, text);
});

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counter animations
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('[data-count]').forEach(counter => {
    counterObserver.observe(counter);
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector('[data-mobile-menu]');
const mobileMenu = document.querySelector('[data-mobile-menu-content]');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        NOMED.state.mobileMenuOpen = !NOMED.state.mobileMenuOpen;
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (NOMED.state.mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        if (NOMED.state.mobileMenuOpen) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.classList.remove('active');
            document.body.style.overflow = '';
            NOMED.state.mobileMenuOpen = false;
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    NOMED.state.isScrolling = false;
}, 150);

window.addEventListener('scroll', () => {
    NOMED.state.isScrolling = true;
    debouncedScrollHandler();
});

// Utility functions
NOMED.utils = {
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format date
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Validate email
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Format number with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Generate random ID
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    }
};

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to page
    document.body.classList.add('animate-fade-in');
    
    // Initialize all interactive elements
    initializeInteractiveElements();
});

function initializeInteractiveElements() {
    // Add hover effects to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });
    
    // Add click effects to buttons
    document.querySelectorAll('button, .btn').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('animate-pulse');
            setTimeout(() => {
                this.classList.remove('animate-pulse');
            }, 150);
        });
    });
}

// Export for use in other scripts
window.NOMED = NOMED;