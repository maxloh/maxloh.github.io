import { css } from './functions';

export const initNavbar = () => {
    /*
     * Globel varieables
     */

    const deviceType = (window.innerWidth < 768) ? 'mobile' : 'desktop';
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.getBoundingClientRect().height;

    /*
     * Add shadow to navbar when it is sticky
     */

    var navbarObserver = new MutationObserver(function () {
        // if one of the .nav-link is active, meaning that navbar is sticking to top of the page
        if (deviceType === 'mobile') {
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

            // If animation of that element has not yet completed yet
            if (css(target, 'opacity') < 1) {
                let currentTranslateY = css(target, 'transform').match(/matrix\(.*, (\d*\.?\d+)\)/)[1];
                window.scroll({
                    top: Math.ceil(scrollY) - Math.floor(currentTranslateY),
                    behavior: 'smooth'
                });
            } else {
                window.scroll({
                    top: Math.ceil(scrollY),
                    behavior: 'smooth'
                });
            }
        })
    });

    /* 
     * Scrollapy and desktop section navigation
     */

    // Horizontal center of the page
    const pageCenter = Math.ceil(window.innerWidth / 2);
    const getCurrentSection = () => {
        let element;
        let viewport = deviceType === 'desktop' ? 1 : navbarHeight + 1;
        console.log(pageCenter + ', ' +viewport);
        do {
            element = document.elementFromPoint(pageCenter, viewport).closest("section");
            viewport += 100;
        } while (element === null);
        console.log(element);
        return element;
    };
    let previousScrollY = window.scrollY;

    addEventListener('scroll', () => {
        // Add scrollapy to page
        if (deviceType === 'mobile' && navbar.getBoundingClientRect().top !== 0) return;
        let activeLink = document.querySelector('a.nav-link.active');
        if (activeLink) activeLink.classList.remove('active');
        document.querySelector('a.nav-link[href="#' + getCurrentSection().id + '"]').classList.add('active');

        // Scroll to next/previous section on scroll on desktop
        // if (deviceType === 'desktop') {
        //     console.log(window.scrollY + ' ' + previousScrollY);
        //     if (window.screenY > previousScrollY) {
        //         let nextSection = getCurrentSection().nextSibling;
        //         do {nextSection = getCurrentSection().nextSibling;} while (nextSection.tagName !== 'section');
        //         console.log(nextSection);
        //         if (nextSection && nextSection.getBoundingClientRect().top < window.scrollY + window.innerHeight - navbarHeight) {
        //             window.scroll({
        //                 top: nextSection.getBoundingClientRect().top,
        //                 behavior: 'smooth'
        //             });
        //         }
        //     } else {
        //         let previousSection;
        //         do {previousSection = getCurrentSection().previousSibling;} while (previousSection.tagName !== 'section');
        //         console.log(previousSection);
        //         if (previousSection && previousSection.getBoundingClientRect().bottom < window.scrollY) {
        //             window.scroll({
        //                 top: previousSection.getBoundingClientRect().top,
        //                 behavior: 'smooth'
        //             });
        //         }
        //     }
        //     previousScrollY = window.scrollY;
        // }
    });
}