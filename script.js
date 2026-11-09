// Mobile Navigation Toggle
const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menu && navbar) {
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    // Auto-close menu when clicking any link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    window.onscroll = () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    };
}

// Typed.js integration for homepage banner
const typedTarget = document.querySelector('.multiple-text');
if (typedTarget && typeof Typed !== 'undefined') {
    new Typed(typedTarget, {
        strings: ['Teacher', 'Writer', 'Nepali'],
        typeSpeed: 80,
        backSpeed: 80,
        backDelay: 1200,
        loop: true,
    });
}
