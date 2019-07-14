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
        // getBoundingClientRect().height may return float number, so we need to floor screenBottom for desktop
        let screenBottom = (deviceType === 'desktop') ? Math.floor(window.innerHeight - navbarHeight) : window.innerHeight;
        for (let element of document.getElementsByTagName('section')) {
            /* element.getBoundingClientRect().top may return -0.XXXXX, which !== 0,
               even if the element is scrolled into view by the window.scroll() function */
            let elementTop = Math.trunc(element.getBoundingClientRect().top);
            if (elementTop >= 0 && elementTop < screenBottom) {
                return element;
            }
        }
    };
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
        const reachtargetSection = () => targetSection === null || Math.floor(targetSection.getBoundingClientRect().top) <= 0;
        const clearOverFlowInterval = () => {
            let resetOverflow = setInterval(() => {
                if (reachtargetSection()) {
                    css('body', { 'overflow': '' });
                    clearInterval(resetOverflow);
                }
            }, 10);
        }
        let previousScrollY = window.scrollY;
        let targetSection = null;

        addEventListener('scroll', () => {
            if (!reachtargetSection()) return;

            let currentSection = getCurrentSection();
            if (currentSection !== targetSection) {
                // scroll behaviour can only prevented by CSS "overflow: hidden" but not event.preventDefault()
                css('body', { 'overflow': 'hidden' });
                // Scrolling down
                if (window.scrollY > previousScrollY) {
                    let currentSectionTop = currentSection.getBoundingClientRect().top;
                    if (currentSection && currentSectionTop > 0) {
                        clearOverFlowInterval();
                        targetSection = currentSection;
                        window.scroll({ top: currentSectionTop + window.scrollY, behavior: 'smooth' });
                    }
                }
                // Scrolling up
                else {
                    let previousSection = currentSection.previousElementSibling;
                    if (previousSection && previousSection.getBoundingClientRect().bottom > 0) {
                        clearOverFlowInterval();
                        targetSection = previousSection;
                        window.scroll({ top: previousSection.getBoundingClientRect().top, behavior: 'smooth' });
                    }
                }
            }
            previousScrollY = window.scrollY;
        });
    }
}