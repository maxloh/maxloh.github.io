//CSS animation
const animationCSS = { 'transition-duration': '1250ms', 'opacity': '1', 'transform': 'translateY(0)' };
const delay = 400;

try {
    const animationObserver = new IntersectionObserver(function (entries, animationObserver) {
        entries.forEach(function (entry) {
            /*Animate element when it enter viewport*/
            if (entry.intersectionRatio > 0) {
                animationObserver.unobserve(entry.target);
                $(entry.target).css(animationCSS);
            }
        });
    });

    /*observe 'main>.section' and animate #navbar on page load*/
    $(document).ready(function () {
        /*If element with id #navbar exists, animate it*/
        if ($('#navbar')[0]) $('#navbar').css(animationCSS);
        setTimeout(function () {
            document.querySelectorAll('main>.section').forEach(function (element) {
                animationObserver.observe(element);
            });
        }, delay);
    });
}
//Add partial support for old browsers that do not support IntersectionObserver
catch (exception) {
    console.log('Compatibility mode, IntersectionObserver not supported');

    var sectionList;

    $(document).ready(function () {
        if ($('#navbar')[0]) {
            $('#navbar').css(animationCSS);
        }
        sectionList = $('main>.section');
        setTimeout(addAnimation, delay);
    });
    $(window).scroll(addAnimation);

    function addAnimation() {
        let displayBottom = $(window).scrollTop() + $(window).height();
        let displayTop = ($('#navbar')[0]) ? $(window).scrollTop() + $('#navbar').innerHeight() : $(window).scrollTop();

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