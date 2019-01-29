//Globel varieables

var device = {
    type: null,
    scrollOffset: null
}
/*if mobile site is displayed
  Breakpoint: 768*/
if ($(window).width() < 768) {
    device.type = 'mobile';
    device.scrollOffset = 2;
}
/*if desktop site is displayed*/
else {
    device.type = 'desktop';
    device.scrollOffset = 0;
}



//Let text of .nav-item stick to the edge of its parent element (.container), when navbar is not sticky

if (device.type === 'desktop') {
    /*When user scroll*/
    window.addEventListener('scroll', function () {
        /*if one of the .nav-link is active, meaning that navbar is sticking to top of the page*/
        if ($('.nav-link.active')[0]) {
            $('.nav-pills').css('transform', 'translateX(1rem)');
        } else {
            $('.nav-pills').css('transform', 'translateX(0)');
        }
    });

    /*When jump links (html anchors) being clicked*/
    window.addEventListener('hashchange', function () { $('#navbar').css('margin-left', 'calc(-15px)'); });
}



//Offset jump links (html anchors) for the sticky navbar and amination, pointing them to the correct position

$(document).ready(function () {
    $('#navbar a').on('click', function () {
        event.preventDefault();
        let target = (this.href).substring((this.href).lastIndexOf('#'));
        let scrollY = $(target).offset().top - $('#navbar').innerHeight() - parseInt($(':root').css('--section-margin'))

        if ($(target).css('opacity') < 1) {
            let currentTranslateY = $(target).css('transform').match(/matrix\(.*, (\d*\.?\d+)\)/)[1];
            window.scroll({ top: scrollY - currentTranslateY + device.scrollOffset, behavior: 'smooth' });
        }
        /*If animation of that element has been completed*/
        else {
            window.scroll({ top: scrollY + device.scrollOffset, behavior: 'smooth' });
        }
    });
});



//Initialize bootstrap scrollspy with calculated data-offset

$(document).ready(function () {
    /*If element with id #navbar exists*/
    if ($('#navbar')[0]) {
        let dataOffset = $('#navbar').innerHeight() + parseInt($(':root').css('--section-margin')) + parseInt($(':root').css('--section-translateY'));
        $('body').scrollspy({ target: '#navbar', offset: dataOffset });
    }
});



//CSS animation

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        /*Animate element when it enter viewport*/
        if (entry.intersectionRatio > 0) {
            observer.unobserve(entry.target);
            animate(entry.target);
        }
    });
});
var delayTime = 0;
var delay = parseInt($(':root').css('--section-margin')) * 5;

/*observe 'main>.section' and animate #navbar on page load*/
$(document).ready(function () {
    /*If element with id #navbar exists, animate it*/
    if ($('#navbar')[0]) animate('#navbar');
    document.querySelectorAll('main>.section').forEach((element) => observer.observe(element));
});

function animate(target) {
    setTimeout(function () {
        delayTime -= delay;
        $(target).css({ 'transition-duration': '1250ms', 'opacity': '1', 'transform': 'translateY(0)' });
    }, delayTime);
    delayTime += delay;
}