// Add partial support for old browsers that do not support IntersectionObserver, e.g. Safari
import 'intersection-observer';
import SmoothScroll from 'smooth-scroll';

export const initNavigation = () => {
    /*
     * Globel varieables
     */

    const deviceType = (window.innerWidth < 768) ? 'mobile' : 'desktop';
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.getBoundingClientRect().height;

    // Height to determine current section 
    const currentSectionPoint = (deviceType === 'desktop') ? Math.floor(window.innerHeight - navbarHeight) : navbarHeight + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--section-margin')) + 1;
    const getCurrentSection = () => {
        let currentSection;
        for (let element of document.getElementsByTagName('section')) {
            if (element.getBoundingClientRect().top < currentSectionPoint) {
                currentSection = element;
            } else break;
        }
        return currentSection;
    };

    /* 
     * Scrollspy
     */

    addEventListener('scroll', () => {
        // Add scrollspy to page
        let activeLink = document.querySelector('a.nav-link.active');
        if (activeLink) activeLink.classList.remove('active');
        if (deviceType === 'mobile' && navbar.getBoundingClientRect().top !== 0) return;
        if (getCurrentSection()) document.querySelector('a.nav-link[href="#' + getCurrentSection().id + '"]').classList.add('active');
    });

    /* 
     * Mobile only JavaScript
     */

    if (deviceType === 'mobile') {

        /*
         * Animation
         * Animate navbar on page load and animate section when it enter viewport
         */

        const delay = 400;
        const animationObserver = new IntersectionObserver(function (entries, animationObserver) {
            entries.forEach(function (entry) {
                // Animate element when it enter viewport
                if (entry.intersectionRatio > 0) {
                    animationObserver.unobserve(entry.target);
                    entry.target.classList.remove('before-animation');
                }
            });
        });

        // Animate navbar and observe section on page load
        navbar.classList.remove('before-animation');
        setTimeout(function () {
            [...document.getElementsByTagName('section')].forEach(function (element) {
                animationObserver.observe(element);
            });
        }, delay);

        /*
         * Add shadow to navbar when it is sticky
         */

        window.addEventListener('scroll', () => {
            if (navbar.getBoundingClientRect().top === 0) navbar.classList.add('sticky');
            else navbar.classList.remove('sticky');
        });

        /* 
         * Navbar jump links handling
         * Offset jump links (html anchors) for the sticky navbar, pointing them to the correct position
         */

        [...document.getElementsByClassName('nav-link')].forEach(function (element) {
            element.addEventListener('click', function (event) {
                event.preventDefault();
                let target = document.getElementById(event.target.href.split('#')[1]);
                window.scroll({ top: target.offsetTop - navbarHeight - parseInt(getComputedStyle(target).marginTop), behavior: 'smooth' });
            })
        });
    }

    /* 
     * Desktop only JavaScript
     */
    else {

        /*
         * Desktop section navigation
         * Scroll to next/previous section on scroll on desktop
         */

        const background = document.getElementById('background');
        const footer = document.getElementsByTagName('footer')[0];
        const scrollbarWidth = (() => {
            const div = document.createElement('div');
            div.style.visibility = 'hidden';
            div.style.overflow = 'scroll';
            document.body.appendChild(div);
            const scrollbarWidth = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
            return scrollbarWidth;
        })();

        let previousScrollY = window.scrollY;
        let previousDestination;

        const headerScrollHandler = () => {
            if (window.scrollY > 0) {
                navbar.classList.remove('before-animation');
                document.getElementById('background').style.opacity = 0.5;
                scrollToSection(document.getElementsByTagName('section')[0], headerScrollHandler, sectionScrollHandler);
                previousScrollY = 0;
            }
        };
        const sectionScrollHandler = () => {
            // Scrolling down
            if (window.scrollY > previousScrollY) {
                let nextSection = getCurrentSection();
                // If next section exists and user scroll through topmost pixel of next section
                if (nextSection && nextSection.getBoundingClientRect().top >= 1) {
                    scrollToSection(nextSection, sectionScrollHandler, sectionScrollHandler);
                }
            }
            // Scrolling up
            else {
                let previousSection = getCurrentSection().previousElementSibling;
                // If previous section exists and user scroll through bottommost pixel of previous section
                if (previousSection && previousSection.getBoundingClientRect().bottom >= 1) {
                    scrollToSection(previousSection, sectionScrollHandler, sectionScrollHandler);
                }
                /* Scroll to header as current section is the first section
                   sectionScrollHandler may be triggered on scrollStop so we need to check 
                   if user scroll through topmost pixel of current section */
                else if (!previousSection && getCurrentSection().getBoundingClientRect().top >= 1) {
                    // Add 'before-animation' class for navbar
                    navbar.classList.add('before-animation');
                    document.getElementById('background').style.opacity = '';
                    scrollToSection(document.getElementsByTagName('header')[0], sectionScrollHandler, headerScrollHandler);
                }
            }

            previousScrollY = window.scrollY;
        };
        const scrollToSection = (destination, listenerToRemove, listenerToAddAfterScroll) => {
            // Scroll behaviour can only prevented by CSS "overflow: hidden" but not event.preventDefault()
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            background.style.width = `calc(100% - ${scrollbarWidth}px)`;
            footer.style.paddingRight = `${parseFloat(getComputedStyle(footer).paddingRight) + scrollbarWidth}px`;
            window.removeEventListener('scroll', listenerToRemove);
            if (previousDestination) previousDestination.classList.add('before-animation');
            new SmoothScroll().animateScroll(destination, 0, { speed: 600, speedAsDuration: true });

            document.addEventListener('scrollStop', function scrollFinish () {
                // Scrolling finish
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                background.style.width = '';
                footer.style.paddingRight = '';
                document.removeEventListener('scrollStop', scrollFinish);
                destination.classList.remove('before-animation');
                window.addEventListener('scroll', listenerToAddAfterScroll);
                previousDestination = destination;
            }, false);
        };

        // Normal page load
        if (window.scrollY === 0) {
            window.addEventListener('scroll', headerScrollHandler);
        }
        // Page reload
        else {
            navbar.classList.remove('before-animation');
            document.getElementById('background').style.opacity = 0.5;
            getCurrentSection().classList.remove('before-animation');
            previousDestination = getCurrentSection();
            window.addEventListener('scroll', sectionScrollHandler);
        }

        /* 
         * Navbar jump links handling
         * Making navbar jump links compatible with section navigation JavaScript
         */

        document.querySelectorAll('#navbar a.nav-link').forEach(function (element) {
            element.addEventListener('click', function (event) {
                event.preventDefault();
                scrollToSection(document.getElementById(event.target.href.split('#')[1]), sectionScrollHandler, sectionScrollHandler);
            })
        });
    }
}