//Let text of .nav-item stick to the edge of its parent element (.container), when navbar is not sticky

/*if desktop site is displayed*/
if ($(window).width() >= 768) {
    /*When user scroll*/
    $(window).scroll(function () {
        /* Options for scroll tracking statements:
        1. if(document.getElementsByClassName('active').length != 0)
        2. var navbar = $('#navbar').offset().top;
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
        let translateY = $(window.location.hash).css('transform').replace(/[^0-9\-.,]/g, '').split(',')[5];
        window.scrollTo(window.scrollX, $(window.location.hash).offset().top - $('#navbar').innerHeight() - translateY - parseInt($(':root').css('--row-margin')));
    }
    /*If animation of that element has been completed*/
    else {
        window.scrollTo(window.scrollX, $(window.location.hash).offset().top - $('#navbar').innerHeight() - parseInt($(':root').css('--row-margin')));
    }
    history.replaceState(null, null, ' ');
});



//Initialize bootstrap scrollspy with calculated data-offset
$(document).ready(function () {
    /*If element with id #navbar exists*/
    if (document.getElementById('navbar')) {
        /*2 * --row-margin: one for top margin, and one for translateY(--row-margin) before animation starts*/
        let dataOffset = $('#navbar').innerHeight() + 2 * parseInt($(':root').css('--row-margin'));
        $('body').scrollspy({ target: '#navbar', offset: dataOffset });
    }
});



//CSS animation

/*Set elementList as a globel varieable to improve efficiency (only modifiy once)*/
var elementList = [];
var delayms = 0;

/*Initialize elementList and call addAnimation() on windows load complete*/
$(document).ready(function () {
    /*If element with id #navbar exists*/
    if (document.getElementById('navbar')) elementList.push('navbar');
    elementList.push.apply(elementList, $("main>.row").map(function () { return this.id; }).get());
    addAnimation();
});

/*Call addAnimation() method on page scroll (for CSS animation)*/
$(window).scroll(function () { addAnimation() });

/*Add CSS animation class to main .row (for CSS animation)*/
function addAnimation() {
    for (var i = 0; i < elementList.length; i++) {
        let row = elementList[i];
        if ($(window).scrollTop() + $(window).height() > $('#' + row).offset().top) {
            /*By the time when statements within setTimeout() executes, variable row has been changed by next turn of loop
              so it is required to pass the loop variable to a cimmediately-invoked function to handle the work*/
            (function (id) {
                setTimeout(function () {
                    delayms -= 250;
                    $('#' + id).css({ 'transition-duration': '1250ms', 'opacity': '1' });
                    $('#' + id).css({ 'transform': 'translateY(0)' });
                    /*Reset #navbar animation duration*/
                    if (id === 'navbar')
                        setTimeout(function () { $('#navbar').css({ 'transition-duration': '250ms', 'transition-timing-function': 'ease-in-out' }) }, 1250);
                }, delayms);
            })(row);
            delayms += 250;
            /*remove 1 element start from i from elementList*/
            elementList.splice(i, 1);
            /*After removing elementList[i] from elementList, elementList[i+1] is now elementList[i]
              in the next turn of loop, elementList[i] (previously elementList[i+1]) should be checked*/
            i--;
        }
    }
}
