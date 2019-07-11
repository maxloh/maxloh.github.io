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
    const getCurrentSection = () => {
        let currentSection;
        let screenBottom = (deviceType === 'desktop') ? window.innerHeight - navbarHeight : window.innerHeight;
        for (let element of document.getElementsByTagName('section')) {
            if (element.getBoundingClientRect().top <= screenBottom) {
                currentSection = element;
            }
        }
        return currentSection;
    };
    let previousScrollY = window.scrollY;
    let targetSection;

    addEventListener('scroll', (event) => {
        // Add scrollapy to page
        if (deviceType === 'mobile' && navbar.getBoundingClientRect().top !== 0) return;
        let activeLink = document.querySelector('a.nav-link.active');
        if (activeLink) activeLink.classList.remove('active');
        if (getCurrentSection()) document.querySelector('a.nav-link[href="#' + getCurrentSection().id + '"]').classList.add('active');

        // Scroll to next/previous section on scroll on desktop
        if (deviceType === 'desktop') {
            // setInterval(() => {
            //     if (targetSection && targetSection.getBoundingClientRect().top === 0) css('body', { 'overflow': '' });
            // }, 10);
            // if (targetSection && targetSection.getBoundingClientRect().top !== 0) return;

            let currentSection = getCurrentSection();
            console.log(window.scrollY + ' ' + previousScrollY);
            console.log(getCurrentSection());

            // if (window.scrollY > previousScrollY) {
            //     console.log('scrolling down');
            //     let nextSection = currentSection.nextElementSibling;
            //     console.log(nextSection);
            //     console.log(nextSection.getBoundingClientRect().top + ' ' + window.innerHeight);
            //     if (nextSection && nextSection.getBoundingClientRect().top < window.innerHeight - navbarHeight) {
            //         targetSection = nextSection;
            //         css('body', { 'overflow': 'hidden' });
            //         window.scroll({
            //             top: nextSection.getBoundingClientRect().top,
            //             behavior: 'smooth'
            //         });
            //     }
            // } else {
            //     console.log('scrolling up');
            //     let previousSection = currentSection.previousElementSibling;
            //     console.log(previousSection);
            //     console.log(previousSection.getBoundingClientRect().bottom);
            //     if (previousSection && previousSection.getBoundingClientRect().bottom > 0) {
            //         targetSection = previousSection;
            //         css('body', { 'overflow': 'hidden' });
            //         window.scroll({
            //             top: previousSection.getBoundingClientRect().top,
            //             behavior: 'smooth'
            //         });
            //     }
            // }
            previousScrollY = window.scrollY;
        }
    });
}