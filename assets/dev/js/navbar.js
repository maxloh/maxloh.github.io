import { css } from './functions';

export const initNavbar = () => {
    /*
     * Globel varieables
     */

    const deviceType = (window.innerWidth < 768) ? 'mobile' : 'desktop';
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.getBoundingClientRect().height;

    /*
     * Let text of .nav-item stick to the edge of its parent element (.container), when navbar is not sticky
     */

    var navbarObserver = new MutationObserver(function () {
        // if one of the .nav-link is active, meaning that navbar is sticking to top of the page
        if (deviceType === 'desktop') {
            if (document.querySelector('a.nav-link.active')) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        } else {
            if (document.querySelector('a.nav-link.active')) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        }
    });
    [...document.getElementsByClassName('nav-link')].forEach(function (element) {
        navbarObserver.observe(element, {
            attributes: true,
            attributeFilter: ['class']
        });
    });

    /* 
     * Offset jump links (html anchors) for the sticky navbar and amination, 
     * pointing them to the correct position
     */

    document.querySelectorAll('#navbar a.nav-link').forEach(function (element) {
        element.addEventListener('click', function (event) {
            event.preventDefault();
            let target = document.getElementById(event.target.href.split('#')[1]);
            let offsetTop = target.getBoundingClientRect().top + window.scrollY;
            let scrollY = (deviceType === 'mobile') ? (offsetTop - navbarHeight) : (offsetTop - parseInt(getComputedStyle(target).marginTop));

            if (css(target, 'opacity') < 1) {
                let currentTranslateY = css(target, 'transform').match(/matrix\(.*, (\d*\.?\d+)\)/)[1];
                window.scroll({
                    top: Math.ceil(scrollY) - Math.floor(currentTranslateY),
                    behavior: 'smooth'
                });
            }
            // If animation of that element has been completed
            else {
                window.scroll({
                    top: Math.ceil(scrollY),
                    behavior: 'smooth'
                });
            }
        })
    });

    /* 
     * Add scrollapy to page
     */

    // Horizontal center of the page
    const pageCenter = Math.ceil(window.innerWidth / 2);

    addEventListener('scroll', () => {
        if (deviceType === 'mobile' && navbar.getBoundingClientRect().top !== 0) return;

        let activeLink = document.querySelector('a.nav-link.active');
        if (activeLink) activeLink.classList.remove('active');

        let element;
        let viewport = deviceType === 'desktop' ? 1 : navbarHeight + 1;
        while ((element = document.elementFromPoint(pageCenter, viewport).closest(".section")) === null) {
            viewport += 100;
        }
        document.querySelector('a.nav-link[href="#' + element.id + '"]').classList.add('active');
    });
}