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
    $(document).ready(function() {
        /*When user scroll*/
        var navbarObserver = new MutationObserver(function() {
            console.log('a');
            /*if one of the .nav-link is active, meaning that navbar is sticking to top of the page*/
            if ($('a.nav-link.active')[0]) {
                $('ul.nav.nav-pills').css('padding-left', '15px');
            } else {
                $('ul.nav.nav-pills').css('padding-left', '');
            }
        });

        navbarObserver.observe(document.querySelector('li.nav-item:first-child>a.nav-link'), {
            attributes: true,
            attributeFilter: ['class']
        });
    });
}



//Offset jump links (html anchors) for the sticky navbar and amination, pointing them to the correct position

$(document).ready(function() {
    $('#navbar a').on('click', function() {
        event.preventDefault();
        let target = (this.href).substring((this.href).lastIndexOf('#'));
        let scrollY = $(target).offset().top - $('#navbar').innerHeight() - parseInt($(':root').css('--section-margin'))

        if ($(target).css('opacity') < 1) {
            let currentTranslateY = $(target).css('transform').match(/matrix\(.*, (\d*\.?\d+)\)/)[1];
            window.scroll({
                top: scrollY - currentTranslateY + device.scrollOffset,
                behavior: 'smooth'
            });
        }
        /*If animation of that element has been completed*/
        else {
            window.scroll({
                top: scrollY + device.scrollOffset,
                behavior: 'smooth'
            });
        }
    });
});



//Initialize bootstrap scrollspy with calculated data-offset

$(document).ready(function() {
    /*If element with id #navbar exists*/
    if ($('#navbar')[0]) {
        let dataOffset = $('#navbar').innerHeight() + parseInt($(':root').css('--section-margin')) + parseInt($(':root').css('--section-translateY'));
        $('body').scrollspy({
            target: '#navbar',
            offset: dataOffset
        });
    }
});