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
            $('#navbar').css("margin-left", "calc(-15px)");
        } else {
            $('#navbar').css("margin-left", "calc(-15px - 1rem)");
        }
    });

    /*When jump links (html anchors) being clicked*/
    window.addEventListener("hashchange", function () { $('#navbar').css("margin-left", "calc(-15px)"); });
}



//Offset jump links (html anchors) for the sticky navbar and amination, pointing them to the correct position
window.addEventListener("hashchange", function () {
    /*If animation of that element has not been completed yet*/
    if ($(window.location.hash).css('opacity') < 1) {
        let translateY = $(window.location.hash).css('transform').match(/matrix.*, (\d+)\)/)[1];
        window.scrollTo(window.scrollX, $(window.location.hash).offset().top - $('#navbar').innerHeight() - parseInt($(':root').css('--row-margin')) - translateY);
    }
    /*If animation of that element has been completed*/
    else {
        window.scrollTo(window.scrollX, $(window.location.hash).offset().top - $('#navbar').innerHeight() - parseInt($(':root').css('--row-margin')));
    }
    /*Remove #id from URL*/
    history.replaceState(null, null, ' ');
    /*Fix scrollspy not accurate after clicking jump links in mobile site*/
    if ($(window).width() < 768) window.scrollTo(window.scrollX, window.scrollY + 2);
});



//Initialize bootstrap scrollspy with calculated data-offset
$(document).ready(function () {
    /*If element with id #navbar exists*/
    if ($('#navbar')[0]) {
        /*2 * --row-margin: one for top margin, and one for translateY(--row-margin) before animation starts*/
        let dataOffset = $('#navbar').innerHeight() + 2 * parseInt($(':root').css('--row-margin'));
        $('body').scrollspy({ target: '#navbar', offset: dataOffset });
    }
});



//CSS animation

/*Set elementList as a globel varieable to improve efficiency (only modifiy once)*/
var elementList;
var delayms = 0;

/*Initialize elementList and call addAnimation() on windows load complete*/
$(document).ready(function () {
    /*If element with id #navbar exists, add animation to #navbar (for reloading page while $(window).scrollTop() != 0)*/
    if ($('#navbar')[0]) {
        $('#navbar').css({ 'transition-duration': '1250ms', 'opacity': '1', 'transform': 'translateY(0)' });
        setTimeout(function () { $('#navbar').css({ 'transition-duration': '250ms', 'transition-timing-function': 'ease' }); }, 1);
        delayms += 250;
    }
    elementList = $('main>.row');
    addAnimation();
});

/*Call addAnimation() method on page scroll (for CSS animation)*/
$(window).scroll(function () { addAnimation() });

/*Add CSS animation class to main .row (for CSS animation)*/
function addAnimation() {
    let displayBottom = $(window).scrollTop() + $(window).height();
    let displayTop = ($('#navbar')[0]) ? $(window).scrollTop() + $('#navbar').innerHeight() : $(window).scrollTop();
    elementList = jQuery.grep(elementList, function (row) {
        /*if (display bootom > elememnt top && display top < element bottom)*/
        if (displayBottom > $(row).offset().top && displayTop < $(row).offset().top + $(row).innerHeight() - $(row).css('transform').match(/matrix.*, (\d+)\)/)[1]) {
            setTimeout(function () {
                delayms -= 250;
                $(row).css({ 'transition-duration': '1250ms', 'opacity': '1', 'transform': 'translateY(0)' });
            }, delayms);
            delayms += 250;
            /*Remove row element from elementList*/
            return false;
        }
        /*Keep row element in elementList as it is not yet being scrolled through*/
        else return true;
    });
}