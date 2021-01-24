export const initNavbar = () => {
    /*
     * Globel varieables
     */

    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.getBoundingClientRect().height;

    /*
     * Let text of .nav-item stick to the edge of its parent element (.container), when navbar is not sticky
     */

    const navbarObserver = new MutationObserver(() => {
        // if one of the .nav-link is active, meaning that navbar is sticking to top of the page
        if (document.getElementsByClassName('nav-link active').length !== 0) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    for (const element of document.getElementsByClassName('nav-link')) {
        navbarObserver.observe(element, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    /* 
     * Offset jump links (html anchors) for the sticky navbar and amination, 
     * pointing them to the correct position
     */

    for (const element of document.getElementsByClassName('nav-link')) {
        element.addEventListener('click', event => {
            event.preventDefault();
            const target = document.getElementById((event.target.href).substring((event.target.href).lastIndexOf('#') + 1));
            const offsetTop = target.getBoundingClientRect().top + window.scrollY;
            const scrollY = offsetTop - navbarHeight - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-margin'));

            if (getComputedStyle(target).opacity < 1) {
                const currentTranslateY = getComputedStyle(target).transform.match(/matrix\(.*, (\d*\.?\d+)\)/)[1];
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
        });
    }

    /* 
     * Add scrollapy to page
     */

    // Horizontal center of the page
    const pageCenter = Math.ceil(window.innerWidth / 2);
    const scrollHandler = () => {
        const activeLink = document.querySelector('a.nav-link.active');
        if (activeLink) activeLink.classList.remove('active');
        if (navbar.getBoundingClientRect().top !== 0) return;

        let viewport = navbarHeight + 1;
        let element;
        do {
            element = document.elementFromPoint(pageCenter, viewport).closest(".row.section");
            viewport += 100;
        } while (element === null);
        document.querySelector('a.nav-link[href="#' + element.id + '"]').classList.add('active');
    };

    addEventListener('scroll', scrollHandler);

    // window.scrollY may be 0 at page reload, but updated after 100ms
    const delay = 100;
    setTimeout(() => {
        if ((window.scrollY || window.pageYOffset) !== 0) {
            const transitionDuration = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--show-transition-duration'));
            // Check for navbar top value until it is zero
            setTimeout(() => {
                const interval = setInterval(() => {
                    if (navbar.getBoundingClientRect().top !== 0) return;
                    clearInterval(interval);
                    scrollHandler();
                }, 10);
            }, transitionDuration - delay);
        }
    }, delay);
};