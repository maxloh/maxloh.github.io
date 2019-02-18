//Globel varieables

var deviceType = null;
/*if mobile site is displayed, breakpoint: 768*/
if ($(window).width() < 768) {
    deviceType = 'mobile';
}
/*if desktop site is displayed*/
else {
    deviceType = 'desktop';
}



//Let text of .nav-item stick to the edge of its parent element (.container), when navbar is not sticky

if (deviceType === 'desktop') {
    $(document).ready(function () {
        /*When user scroll*/
        var navbarObserver = new MutationObserver(function () {
            /*if one of the .nav-link is active, meaning that navbar is sticking to top of the page*/
            if ($('a.nav-link.active')[0]) {
                $('ul.nav.nav-pills').css('margin-left', '0px');
            } else {
                $('ul.nav.nav-pills').css('margin-left', '');
            }
        });
        document.querySelectorAll('li.nav-item:first-child>a.nav-link').forEach(function (element) {
            navbarObserver.observe(element, {
                attributes: true,
                attributeFilter: ['class']
            });
        });
    });
}



//Offset jump links (html anchors) for the sticky navbar and amination, pointing them to the correct position

$(document).ready(function () {
    $('#navbar a').on('click', function () {
        event.preventDefault();
        let target = (this.href).substring((this.href).lastIndexOf('#'));
        let scrollY = $(target).offset().top - $('#navbar').innerHeight() - parseInt($(':root').css('--navbar-margin'))

        if ($(target).css('opacity') < 1) {
            let currentTranslateY = $(target).css('transform').match(/matrix\(.*, (\d*\.?\d+)\)/)[1];
            window.scroll({
                top: Math.ceil(scrollY) - Math.floor(currentTranslateY),
                behavior: 'smooth'
            });
        }
        /*If animation of that element has been completed*/
        else {
            window.scroll({
                top: Math.ceil(scrollY),
                behavior: 'smooth'
            });
        }
    });
});



//Initialize bootstrap scrollspy with calculated data-offset

$(document).ready(function () {
    /*If element with id #navbar exists*/
    if ($('#navbar')[0]) {
        let sectionTranslateY = eval($(':root').css('--section-translateY').replace(/[A-z()]/g, ''));
        let dataOffset = $('#navbar').innerHeight() + parseInt($(':root').css('--section-margin')) + sectionTranslateY;
        $('body').scrollspy({
            target: '#navbar',
            offset: dataOffset
        });
    }
});