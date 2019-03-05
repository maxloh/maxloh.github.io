/* ----------------------------------------------------------------------------------------------------
   Globel varieables
   ---------------------------------------------------------------------------------------------------- */

var deviceType = null;
if (window.innerWidth < 768) deviceType = 'mobile'; // if mobile site is displayed, breakpoint: 768
else deviceType = 'desktop'; // if desktop site is displayed

var navbar;
var navbarHeight;
addEventListener('DOMContentLoaded', function () {
    navbar = document.getElementById('navbar');
    navbarHeight = navbar.getBoundingClientRect().height;
});

/* ----------------------------------------------------------------------------------------------------
   Let text of .nav-item stick to the edge of its parent element (.container), 
   when navbar is not sticky
   ---------------------------------------------------------------------------------------------------- */

addEventListener('DOMContentLoaded', function () {
    var navbarObserver = new MutationObserver(function () {
        // if one of the .nav-link is active, meaning that navbar is sticking to top of the page
        if (document.querySelector('a.nav-link.active')) {
            if (deviceType === 'desktop') {
                css(navbar, {
                    'margin-left': 'var(--navbar-strech)',
                    // 8 dp shadow in material design
                    'box-shadow': '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)'
                });
            } else {
                css(navbar, {
                    // 4 dp shadow in material design
                    'box-shadow': '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
                });
            }
        } else {
            css(navbar, { 'box-shadow': '' });
            if (deviceType === 'desktop') css(navbar, { 'margin-left': '' });
        }
    });
    document.querySelectorAll('li.nav-item:first-child>a.nav-link').forEach(function (element) {
        navbarObserver.observe(element, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
});


/* ----------------------------------------------------------------------------------------------------
   Offset jump links (html anchors) for the sticky navbar and amination, 
   pointing them to the correct position
   ---------------------------------------------------------------------------------------------------- */

addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#navbar a.nav-link').forEach(function () {
        addEventListener('click', function (event) {
            event.preventDefault();
            let target = document.getElementById((event.target.href).substring((event.target.href).lastIndexOf('#') + 1));
            let offsetTop = target.getBoundingClientRect().top + window.scrollY;
            let scrollY = offsetTop - navbarHeight - parseInt(cssVar('--navbar-margin'));

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
});


/* ----------------------------------------------------------------------------------------------------
   Add scrollapy to page
   ---------------------------------------------------------------------------------------------------- */

// Horizontal center of the page
var pageCenter = Math.ceil(window.innerWidth / 2);

addEventListener('scroll', function () {
    var activeLink = document.querySelector('a.nav-link.active')
    if (activeLink) activeLink.classList.remove('active');
    if (navbar.getBoundingClientRect().top !== 0) return;

    let viewport = navbarHeight + 1;
    let element;
    while ((element = document.elementFromPoint(pageCenter, viewport).closest(".row.section")) === null) {
        viewport += 100;
    }
    document.querySelector('a.nav-link[href="#' + element.id + '"]').classList.add('active');
});