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
     * Scrollapy
     */

    // Horizontal center of the page
    const getCurrentSection = () => {
        let currentSection;
        for (let element of document.getElementsByTagName('section')) {
            if (element.getBoundingClientRect().top < screenBottom) {
                currentSection = element;
            }
        }
        return currentSection;
    };
    const screenBottom = (deviceType === 'desktop') ? Math.floor(window.innerHeight - navbarHeight) : window.innerHeight;

    addEventListener('scroll', () => {
        // Add scrollapy to page
        if (deviceType === 'mobile' && navbar.getBoundingClientRect().top !== 0) return;
        let activeLink = document.querySelector('a.nav-link.active');
        if (activeLink) activeLink.classList.remove('active');
        if (getCurrentSection()) document.querySelector('a.nav-link[href="#' + getCurrentSection().id + '"]').classList.add('active');
    });

    /*
     * Desktop section navigation
     * Scroll to next/previous section on scroll on desktop
     */

    if (deviceType === 'desktop') {
        let previousScrollY = window.scrollY;
        let targetSection;

        const scrollHandler = () => {
            // Page reload
            if (window.scrollY === previousScrollY) return;
            // Scrolling down
            else if (window.scrollY > previousScrollY) {
                let currentSection = getCurrentSection();
                // If next section exists and user scroll through topmost pixel of next section
                if (currentSection && currentSection.getBoundingClientRect().top > 0) {
                    // Scroll behaviour can only prevented by CSS "overflow: hidden" but not event.preventDefault()
                    css('body', { 'overflow': 'hidden' });
                    targetSection = currentSection;
                    window.scroll({ top: targetSection.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
                    window.removeEventListener('scroll', scrollHandler);
                    waitForScrollFinish();
                }
            }
            // Scrolling up
            else {
                let previousSection = getCurrentSection().previousElementSibling;
                // If previous section exists and user scroll through bottommost pixel of previous section
                if (previousSection && previousSection.getBoundingClientRect().bottom > 0) {
                    // Scroll behaviour can only prevented by CSS "overflow: hidden" but not event.preventDefault()
                    css('body', { 'overflow': 'hidden' });
                    targetSection = previousSection;
                    window.scroll({ top: targetSection.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
                    window.removeEventListener('scroll', scrollHandler);
                    waitForScrollFinish();
                }
            }

            previousScrollY = window.scrollY;
        };
        const waitForScrollFinish = () => {
            let resetOverflow = setInterval(() => {
                /* If window reach target section 
                   getBoundingClientRect() may return float number so we floor the returned number */
                if (Math.floor(targetSection.getBoundingClientRect().top) === 0 ||
                    Math.floor(targetSection.getBoundingClientRect().bottom) === Math.floor(screenBottom)) {
                    css('body', { 'overflow': '' });
                    clearInterval(resetOverflow);
                    window.addEventListener('scroll', scrollHandler);
                }
            }, 10);
        };

        window.addEventListener('scroll', scrollHandler);
    }
}