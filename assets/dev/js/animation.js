// Add partial support for old browsers that do not support IntersectionObserver, e.g. Safari
import 'intersection-observer';

export const initAnimation = () => {
    const delay = 400;
    const navbar = document.getElementById('navbar');
    const section = [...document.getElementsByClassName('section')];

    const animationObserver = new IntersectionObserver(function (entries, animationObserver) {
        entries.forEach(function (entry) {
            // Animate element when it enter viewport
            if (entry.intersectionRatio > 0) {
                animationObserver.unobserve(entry.target);
                entry.target.classList.remove('before-animation');
            }
        });
    });

    navbar.classList.remove('before-animation');
    // observe 'main>.section' and animate #navbar on page load
    setTimeout(function () {
        section.forEach(function (element) {
            animationObserver.observe(element);
        });
    }, delay);
}