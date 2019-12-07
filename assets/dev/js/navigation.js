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
    const sectionList = [...document.getElementsByTagName('section')];
    let getCurrentSection = () => {
        for (let element of sectionList) {
            let elementTop = Math.trunc(element.getBoundingClientRect().top);
            let elementBottom = Math.trunc(element.getBoundingClientRect().bottom);
            if (elementTop === 0 || (elementTop < 0 && elementBottom > 0)) {
                return element;
            }
        }
        return null;
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
        const animationObserver = new IntersectionObserver((entries, animationObserver) => {
            entries.forEach((entry) => {
                // Animate element when it enter viewport
                if (entry.intersectionRatio > 0) {
                    animationObserver.unobserve(entry.target);
                    entry.target.classList.remove('before-animation');
                }
            });
        });

        // Animate navbar and observe section on page load
        navbar.classList.remove('before-animation');
        setTimeout(() => {
            sectionList.forEach((element) => {
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

        [...document.getElementsByClassName('nav-link')].forEach((element) => {
            element.addEventListener('click', (event) => {
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

        getCurrentSection = () => sectionList.find(s => !s.classList.contains('above-viewport') && !s.classList.contains('below-viewport'));

        const scrollToSection = (destinationIndex, currentIndex) => {
            // Scroll behaviour can only prevented by CSS "overflow: hidden" but not event.preventDefault()
            document.body.style.overflow = 'hidden';
            sectionList[destinationIndex].style.display = '';
            sectionList[currentIndex].classList.add('animating');
            sectionList[destinationIndex].classList.add('animating');

            // Transition would not be evoked if it is followed instantly afer display: none is removed
            setTimeout(() => {
                if (destinationIndex > currentIndex) {
                    sectionList[currentIndex].classList.add('above-viewport');
                    sectionList[destinationIndex].classList.remove('below-viewport');
                } else {
                    sectionList[currentIndex].classList.add('below-viewport');
                    sectionList[destinationIndex].classList.remove('above-viewport');
                }
            }, 50);

            // Scrolling finish
            // TODO: change timeout value
            setTimeout(() => {
                document.body.style.overflow = '';
                sectionList[currentIndex].classList.remove('animating');
                sectionList[destinationIndex].classList.remove('animating');
            }, 1000);
        };
        const scrollHandler = (event, direction) => {
            let currentSection = getCurrentSection();
            let currentSectionIndex = sectionList.findIndex(s => s === currentSection);

            if (currentSection) {
                // Scrolling down to next section
                if (direction === 'down') {
                    event.preventDefault();
                    if (currentSectionIndex !== sectionList.length) {
                        scrollToSection(currentSectionIndex + 1, currentSectionIndex);
                    }
                }
                // Scrolling up to previous section
                else if (direction === 'up') {
                    if (currentSectionIndex !== 0) {
                        scrollToSection(currentSectionIndex - 1, currentSectionIndex);
                    } else {
                        // navbar.classList.add('before-animation');
                        // Scroll to header
                    }
                }
            }
            // Scrolling down from header to first section
            // else if (direction === 'down') {
            //     navbar.classList.remove('before-animation');
            //     scrollToSection(sectionList[0]);
            // }
        };

        // when Page reload
        if (window.scrollY !== 0) {
            navbar.classList.remove('before-animation');
            document.getElementById('background').style.opacity = 0.5;
            getCurrentSection().classList.remove('before-animation');
            document.querySelector('a.nav-link[href="#' + getCurrentSection().id + '"]').classList.add('active');
        }

        document.addEventListener('wheel', event => scrollHandler(event, event.deltaY < 0 ? 'up' : 'down'), { passive: false });
        document.addEventListener('keydown', event => {
            if (event.keyCode === 38) scrollHandler(event, 'up');
            else if (event.keyCode === 40) scrollHandler(event, 'down');
        }, { passive: false });

        sectionList.forEach((s, index) => { if (index !== 0) s.classList.add('below-viewport'); });

        /* 
         * Navbar jump links handling
         * Making navbar jump links compatible with section navigation JavaScript
         */

        document.querySelectorAll('#navbar a.nav-link').forEach((element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                scrollToSection(document.getElementById(event.target.href.split('#')[1]));
            })
        });
    }
}