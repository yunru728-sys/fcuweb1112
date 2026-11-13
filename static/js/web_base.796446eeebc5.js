const navItem = document.querySelectorAll('.top-nav');

document.querySelectorAll('.dropdown-btn').forEach(element => {
    const dropdown = element.parentElement.nextElementSibling;
    element.addEventListener('click', (event) => {
        dropdown?.classList.toggle('show');
    });
});

navItem.forEach(element => {
    const dropdown = element.querySelector('.dropdown-menu');
    const navLink = element.querySelector('.nav-link');
    if (window.matchMedia('(min-width: 992px)').matches) {
        element.addEventListener('mouseenter', () => {
            dropdown?.classList.add('show');
            navLink?.classList.add('hover');
        });
    
        element.addEventListener('mouseleave', () => {
            dropdown?.classList.remove('show');
            navLink?.classList.remove('hover');
        });
    }
});

const logo = document.querySelector('#logo');
const navbar = document.querySelector('.navbar');
let scrollFrame = null;
let navIsScaled = false;

const updateNavigationScale = () => {
    scrollFrame = null;
    const shouldScale = window.scrollY > 30;
    if (shouldScale === navIsScaled || !logo || !navbar) {
        return;
    }

    navIsScaled = shouldScale;
    logo.classList.toggle('scale-img', shouldScale);
    navbar.classList.toggle('scale-nav', shouldScale);
};

window.addEventListener('scroll', () => {
    if (scrollFrame === null) {
        scrollFrame = window.requestAnimationFrame(updateNavigationScale);
    }
}, { passive: true });
