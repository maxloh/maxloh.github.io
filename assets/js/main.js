//Let text of .nav-item stick to the edge of its parent element (.container), when navbar is not sticky

/*if desktop site is displayed*/
if ($(window).width() >= 768) {
    /*When user scroll*/
    $(window).scroll(function () {
        /* Options for scroll tracking statements:
        1. if(document.getElementsByClassName('active').length != 0)
        2. let navbar = $('#navbar').offset().top;
           if ($(window).scrollTop() >= navbar)*/
        /*if one of the .nav-link is active, meaning that navbar is sticking to top of the page*/
        if ($('.active')[0]) {
            $('#navbar').css('margin-left', '-15px');
        } else {
            $('#navbar').css('margin-left', 'calc(-15px - 1rem)');
        }
    });

    /*When jump links (html anchors) being clicked*/
    window.addEventListener('hashchange', function () { $('#navbar').css('margin-left', 'calc(-15px)'); });
}



//Offset jump links (html anchors) for the sticky navbar and amination, pointing them to the correct position

window.addEventListener('hashchange', function () {
    /*If hashchange is not caused by opening PhotoSwipe gallery && hashchange is not caused by closing PhotoSwipe gallery*/
    if (!window.location.hash.includes('gid') && window.location.hash !== '') {
        /*If animation of that element has not been completed yet*/
        if ($(window.location.hash).css('opacity') < 1) {
            let currentTranslateY = $(window.location.hash).css('transform').match(/matrix\(.*, (\d*\.?\d+)\)/)[1];
            window.scrollTo(window.scrollX, $(window.location.hash).offset().top - $('#navbar').innerHeight() - parseInt($(':root').css('--section-margin')) - currentTranslateY);
        }
        /*If animation of that element has been completed*/
        else {
            window.scrollTo(window.scrollX, $(window.location.hash).offset().top - $('#navbar').innerHeight() - parseInt($(':root').css('--section-margin')));
        }
        /*Fix scrollspy not accurate after clicking jump links in mobile site*/
        if ($(window).width() < 768) window.scrollTo(window.scrollX, window.scrollY + 2);
        /*Remove #id from URL*/
        history.replaceState(null, null, ' ');
    }
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

var sectionList;
var delayTime = 0;
var delay = parseInt($(':root').css('--section-margin')) * 5;

/*Initialize sectionList and call addAnimation() on windows load complete*/
$(document).ready(function () {
    /*If element with id #navbar exists, add animation to #navbar (for reloading page while $(window).scrollTop() != 0)*/
    if ($('#navbar')[0]) {
        $('#navbar').css({ 'transition-duration': '1250ms', 'opacity': '1', 'transform': 'translateY(0)' });
        setTimeout(function () { $('#navbar').css({ 'transition-duration': '250ms', 'transition-timing-function': 'ease' }); }, 1);
        delayTime += delay;
    }
    sectionList = $('main>.section');
    addAnimation();

    /*Call addAnimation() method on page scroll (for CSS animation)
      $(window).scroll may be fired accidentally when refreshing the page while window.scrollY != 0*/
    $(window).scroll(function () { addAnimation() });
});

/*Add CSS animation class to main .section (for CSS animation)*/
function addAnimation() {
    let displayBottom = $(window).scrollTop() + $(window).height();
    let displayTop = ($('#navbar')[0]) ? $(window).scrollTop() + $('#navbar').innerHeight() : $(window).scrollTop();
    sectionList = jQuery.grep(sectionList, function (section) {
        /*if (display bootom > elememnt top && display top < element bottom)*/
        if (displayBottom > $(section).offset().top && displayTop < $(section).offset().top + $(section).innerHeight() - $(section).css('transform').match(/matrix\(.*, (\d*\.?\d+)\)/)[1]) {
            setTimeout(function () {
                delayTime -= delay;
                $(section).css({ 'transition-duration': '1250ms', 'opacity': '1', 'transform': 'translateY(0)' });
            }, delayTime);
            delayTime += delay;
            /*Remove section element from sectionList*/
            return false;
        }
        /*Keep section element in sectionList as it is not yet being scrolled through*/
        else return true;
    });
}