/* ----------------------------------------------------------------------------------------------------
   CSS animation
   ---------------------------------------------------------------------------------------------------- */
const animationCSS = { 'opacity': '1', 'transform': 'translateY(0)' };
const delay = 400;
const navbarSelector = '#navbar';
const sectionSelector = 'main>.section';

try {
    const animationObserver = new IntersectionObserver(function (entries, animationObserver) {
        entries.forEach(function (entry) {
            // Animate element when it enter viewport
            if (entry.intersectionRatio > 0) {
                animationObserver.unobserve(entry.target);
                $(entry.target).css(animationCSS);
            }
        });
    });

    // observe 'main>.section' and animate #navbar on page load
    $(document).ready(function () {
        // If element with id #navbar exists, animate it
        if ($(navbarSelector)[0]) $(navbarSelector).css(animationCSS);
        setTimeout(function () {
            document.querySelectorAll(sectionSelector).forEach(function (element) {
                animationObserver.observe(element);
            });
        }, delay);
    });
}

/* ----------------------------------------------------------------------------------------------------
   Add partial support for old browsers that do not support IntersectionObserver
   ---------------------------------------------------------------------------------------------------- */
catch (exception) {
    console.log('Compatibility mode, IntersectionObserver not supported');

    var sectionList;

    $(document).ready(function () {
        if ($(navbarSelector)[0]) {
            $(navbarSelector).css(animationCSS);
        }
        sectionList = $(sectionSelector);
        setTimeout(addAnimation, delay);
    });
    $(window).scroll(addAnimation);

    function addAnimation () {
        let displayBottom = $(window).scrollTop() + $(window).height();
        let displayTop = ($(navbarSelector)[0]) ? $(window).scrollTop() + $(navbarSelector).innerHeight() : $(window).scrollTop();

        sectionList = jQuery.grep(sectionList, function (section) {
            let sectionTranslateY = $(section).css('transform').match(/matrix\(.*, (\d*\.?\d+)\)/)[1];
            let sectionTop = $(section).offset().top - sectionTranslateY;
            let sectionBottom = sectionTop + $(section).innerHeight();

            if (displayBottom > sectionTop && displayTop < sectionBottom) {
                $(section).css(animationCSS);
                return false;
            } else return true;
        });
    }
}

/* ----------------------------------------------------------------------------------------------------
   Replacement for jQuery $(...).css() method
   ---------------------------------------------------------------------------------------------------- */

function css (selector, styles) {
    let element = document.querySelector(selector);
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