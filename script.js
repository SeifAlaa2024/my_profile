// --- Theme Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Default is dark. Check if user previously switched to light.
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    
    if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

// --- Mobile Navigation ---
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const navIcon = mobileToggle.querySelector('i');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        navIcon.classList.replace('fa-bars', 'fa-times');
    } else {
        navIcon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navIcon.classList.replace('fa-times', 'fa-bars');
    });
});

// --- Scroll Reveal & Skill Bar Animation ---
const revealElements = document.querySelectorAll('.reveal');
const progressBars = document.querySelectorAll('.progress');

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'active' class to trigger CSS fade/slide up
            entry.target.classList.add('active');
            
            // If the element contains progress bars, animate them
            const bars = entry.target.querySelectorAll('.progress');
            if (bars.length > 0) {
                bars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            }
            
            // Unobserve after animating once for performance
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    scrollObserver.observe(el);
});