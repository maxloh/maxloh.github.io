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
            let scrollY = (deviceType === 'mobile') ? (target.offsetTop - navbarHeight) : (target.offsetTop - parseInt(getComputedStyle(target).marginTop));

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

        const headerScrollHandler = () => {
            targetSection = getCurrentSection();
            navbar.classList.remove('before-animation');
            if (typeof getCurrentSection() !== 'undefined') scrollToSection(getCurrentSection(), headerScrollHandler, sectionScrollHandler);
        };
        const sectionScrollHandler = () => {
            // Scrolling down
            if (window.scrollY > previousScrollY) {
                let nextSection = getCurrentSection();
                // If next section exists and user scroll through topmost pixel of next section
                if (nextSection && nextSection.getBoundingClientRect().top > 0) {
                    scrollToSection(nextSection, sectionScrollHandler, sectionScrollHandler);
                }
            }
            // Scrolling up
            else {
                let previousSection = getCurrentSection().previousElementSibling;
                // If previous section exists and user scroll through bottommost pixel of previous section
                if (previousSection && previousSection.getBoundingClientRect().bottom > 0) {
                    scrollToSection(previousSection, sectionScrollHandler, sectionScrollHandler);
                }
                // Scroll to header as current section is the first section
                else if (!previousSection) {
                    // Add 'before-animation' class for navbar
                    navbar.classList.add('before-animation');
                    scrollToSection(document.getElementsByTagName('header')[0], sectionScrollHandler, headerScrollHandler);
                }
            }

            previousScrollY = window.scrollY;
        };
        const scrollToSection = (sectionToScroll, listenerToRemove, listenerToAddAfterScroll) => {
            // Scroll behaviour can only prevented by CSS "overflow: hidden" but not event.preventDefault()
            css('body', { 'overflow': 'hidden' });
            // Add 'before-animation' class for current section
            targetSection.classList.add('before-animation');

            targetSection = sectionToScroll;
            window.scroll({ top: targetSection.offsetTop, behavior: 'smooth' });
            window.removeEventListener('scroll', listenerToRemove);

            // Wait for scroll finish
            let resetOverflow = setInterval(() => {
                /* If window reach target section 
                   getBoundingClientRect().top may be float number so we need to floor() it 
                   trunc() is not the suitable function to use as it will clear the interval too early (before the scroll actually finish) while scrolling up */
                if (Math.floor(targetSection.getBoundingClientRect().top) === 0) { // To do: && navbarBottom === 0
                    css('body', { 'overflow': '' });
                    clearInterval(resetOverflow);
                    window.addEventListener('scroll', listenerToAddAfterScroll);
                    // Remove 'before-animation' class while scroll reach target section
                    targetSection.classList.remove('before-animation');
                }
            }, 10);
        };

        // Normal page load
        if (window.scrollY === previousScrollY) {
            window.addEventListener('scroll', headerScrollHandler);
        }
        // Page reload
        else {
            targetSection = getCurrentSection();
            targetSection.classList.remove('before-animation');
            window.addEventListener('scroll', sectionScrollHandler);
        }
    }
}