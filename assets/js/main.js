//CSS animation
try {
    const animationObserver = new IntersectionObserver(function (entries, animationObserver) {
        entries.forEach(function (entry) {
            /*Animate element when it enter viewport*/
            if (entry.intersectionRatio > 0) {
                animationObserver.unobserve(entry.target);
                animate(entry.target);
            }
        });
    });
    var delayTime = 0;
    var delay = 500;

    /*observe 'main>.section' and animate #navbar on page load*/
    $(document).ready(function () {
        /*If element with id #navbar exists, animate it*/
        if ($('#navbar')[0]) animate('#navbar');
        document.querySelectorAll('main>.section').forEach(function (element) {
            animationObserver.observe(element);
        });
    });

    function animate(target) {
        setTimeout(function () {
            delayTime -= delay;
            $(target).css({
                'transition-duration': '1250ms',
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, delayTime);
        delayTime += delay;
    }
}
//Add partial support for old browsers that do not support IntersectionObserver
catch (exception) {
    console.log('Animation disabled\n' + exception);
    document.addEventListener("DOMContentLoaded", function () {
        var navbar = document.querySelector('.navbar');
        navbar.style.opacity = 1;
        navbar.style.transform = "translateY(0)";
        [].forEach.call(document.querySelectorAll('main>.section'), function (element) {
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        });
    });
}