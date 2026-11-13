let navItem = document.querySelectorAll('.top-nav');
let active = document.querySelector('.nav-item .nav-link.active');

document.querySelectorAll('.dropdown-btn').forEach(element => {
    element.addEventListener('click', (event) => {
        element.parentElement.nextElementSibling.classList.toggle('show');
    });
});

navItem.forEach(element => {
    if (window.innerWidth >= 992) {
        element.addEventListener('mouseover', (event) => {
            element.querySelector('.dropdown-menu')?.classList.add('show');
            element.querySelector('.nav-link').classList.add('hover');
            active?.classList.remove('active');
        });
    
        element.addEventListener('mouseout', (event) => {
            element.querySelector('.dropdown-menu')?.classList.remove('show');
            element.querySelector('.nav-link').classList.remove('hover');
            active?.classList.add('active');
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
