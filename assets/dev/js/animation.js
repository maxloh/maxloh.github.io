import {css} from './functions';

export const initAnimation = () => {
    const animationCSS = { 'opacity': '1', 'transform': 'translateY(0)' };
    const delay = 400;
    const navbar = document.getElementById('navbar');
    const section = document.querySelectorAll('main>.section');

    if (typeof IntersectionObserver !== 'undefined') {
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

    // Add partial support for old browsers that do not support IntersectionObserver, e.g. Safari
    else {
        console.log('Compatibility mode, IntersectionObserver not supported');

        let sectionList = [...section];
        let addAnimation = function () {
            let displayBottom = window.scrollY + window.innerHeight;
            let displayTop = (navbar) ? window.scrollY + navbar.getBoundingClientRect().height : window.scrollY;

            sectionList = sectionList.filter(function (section) {
                let sectionTranslateY = css(section, 'transform').match(/matrix\(.*, (\d*\.?\d+)\)/)[1];
                let sectionTop = (section.getBoundingClientRect().top + window.scrollY) - sectionTranslateY;
                let sectionBottom = sectionTop + section.getBoundingClientRect().height;

                if (displayBottom > sectionTop && displayTop < sectionBottom) {
                    section.classList.remove('before-animation');
                    return false;
                } else return true;
            });
        }

        navbar.classList.remove('before-animation');
        setTimeout(addAnimation, delay);
        addEventListener('scroll', addAnimation);
    }
}