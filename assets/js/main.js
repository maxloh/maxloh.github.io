/* ----------------------------------------------------------------------------------------------------
   CSS animation
   ---------------------------------------------------------------------------------------------------- */

const animationCSS = { 'opacity': '1', 'transform': 'translateY(0)' };
const delay = 400;

addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const section = document.querySelectorAll('main>.section');

    if (typeof IntersectionObserver !== 'undefined') {
        const animationObserver = new IntersectionObserver(function (entries, animationObserver) {
            entries.forEach(function (entry) {
                // Animate element when it enter viewport
                if (entry.intersectionRatio > 0) {
                    animationObserver.unobserve(entry.target);
                    css('#' + entry.target.id, animationCSS);
                }
            });
        });

        // If element with id #navbar exists, animate it
        if (navbar) css(navbar, animationCSS);
        // observe 'main>.section' and animate #navbar on page load
        setTimeout(function () {
            section.forEach(function (element) {
                animationObserver.observe(element);
            });
        }, delay);
    }

    // Add partial support for old browsers that do not support IntersectionObserver, e.g. Safari
    else {
        console.log('Compatibility mode, IntersectionObserver not supported');

        let sectionList = [...section];
        let addAnimation = function () {
            let displayBottom = window.scrollY + window.innerHeight;
            let displayTop = (navbar) ? window.scrollY + navbar.getBoundingClientRect().height : window.scrollY;

            sectionList = sectionList.filter(function (section) {
                let sectionTranslateY = css(section, 'transform').match(/matrix\(.*, (\d*\.?\d+)\)/)[1];
                let sectionTop = (section.getBoundingClientRect().top + window.scrollY) - sectionTranslateY;
                let sectionBottom = sectionTop + section.getBoundingClientRect().height;

                if (displayBottom > sectionTop && displayTop < sectionBottom) {
                    css(section, animationCSS);
                    return false;
                } else return true;
            });
        }

        if (navbar) css(navbar, animationCSS);
        setTimeout(addAnimation, delay);
        addEventListener('scroll', addAnimation);
    }
});

/* ----------------------------------------------------------------------------------------------------
   Replacement for jQuery $(...).css() method
   ---------------------------------------------------------------------------------------------------- */

function css (element, styles) {
    if (typeof element === 'string') element = document.querySelector(element);
    if (typeof styles === 'string') {
        return eval('getComputedStyle(element).' + getCssPropertyName(styles));
    } else {
        for (var key in styles) {
            eval('element.style.' + getCssPropertyName(key) + '="' + styles[key] + '";');
        }
    }

    function getCssPropertyName (property) {
        return property.replace(/-[a-z]/g, function (match) { return match.substring(1).toUpperCase(); })
    }
}

function cssVar (varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName);
}