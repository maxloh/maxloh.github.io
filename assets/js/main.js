//CSS animation
try {
const animationObserver = new IntersectionObserver((entries, animationObserver) => {
    entries.forEach((entry) => {
        /*Animate element when it enter viewport*/
        if (entry.intersectionRatio > 0) {
            animationObserver.unobserve(entry.target);
            animate(entry.target);
        }
    });
});
var delayTime = 0;
var delay = parseInt($(':root').css('--section-margin')) * 5;

/*observe 'main>.section' and animate #navbar on page load*/
$(document).ready(function() {
    /*If element with id #navbar exists, animate it*/
    if ($('#navbar')[0]) animate('#navbar');
    document.querySelectorAll('main>.section').forEach((element) => animationObserver.observe(element));
});

function animate(target) {
    setTimeout(function() {
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
    console.log(exception);
    errorHandler();
}