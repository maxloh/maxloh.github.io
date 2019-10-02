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
    const getCurrentSection = () => {
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
        const screenBottom = Math.floor(window.innerHeight - navbarHeight);
        const scrollbarWidth = (() => {
            const div = document.createElement('div');
            div.style.visibility = 'hidden';
            div.style.overflow = 'scroll';
            document.body.appendChild(div);
            const scrollbarWidth = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
            return scrollbarWidth;
        })();

        const scrollToSection = (destination) => {
            // Scroll behaviour can only prevented by CSS "overflow: hidden" but not event.preventDefault()
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            background.style.width = `calc(100% - ${scrollbarWidth}px)`;
            footer.style.paddingRight = `${parseFloat(getComputedStyle(footer).paddingRight) + scrollbarWidth}px`;

            sectionList.filter(section => section !== destination).forEach((section) => section.classList.add('before-animation'));
            new SmoothScroll().animateScroll(destination, 0, { speed: 600, speedAsDuration: true });

            // Scrolling finish
            document.addEventListener('scrollStop', (event) => {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                background.style.width = '';
                footer.style.paddingRight = '';
                event.detail.anchor.classList.remove('before-animation');
            }, false);
        };
        const scrollHandler = (event, direction) => {
            let currentSection = getCurrentSection();
            if (currentSection) {
                let currentSectionTop = Math.trunc(currentSection.getBoundingClientRect().top);
                let currentSectionBottom = Math.trunc(currentSection.getBoundingClientRect().bottom);

                // Scrolling down to next section
                // currentSection !== sectionList[sectionList.length - 1]: if not scrolling down form the bottomest pixel of the last section, where currentSectionBottom === screenBottom
                if (direction === 'down' && currentSectionBottom <= screenBottom && currentSection !== sectionList[sectionList.length - 1]) {
                    event.preventDefault();
                    scrollToSection(currentSection.nextElementSibling);
                }
                // Scrolling up to previous section from non-last-section
                else if (direction === 'up' && currentSectionTop === 0) {
                    if (currentSection.previousElementSibling) {
                        scrollToSection(currentSection.previousElementSibling);
                    } else {
                        navbar.classList.add('before-animation');
                        scrollToSection(document.getElementsByTagName('header')[0]);
                    }
                }
                // Scrolling up to previous section from the last section, currentSection variable actually store a reference to n-1 section
                else if (direction === 'up' && currentSectionBottom < window.innerHeight / 2 && currentSectionTop < 0) {
                    event.preventDefault();
                    scrollToSection(currentSection);
                }
                // Scrolling within a section
                else return;
            }
            // Scrolling down from header to first section
            else if (direction === 'down') {
                navbar.classList.remove('before-animation');
                scrollToSection(sectionList[0]);
            }
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