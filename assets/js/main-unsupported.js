function errorHandler() {
    document.onreadystatechange = function() {
        console.log('Error handler');
        var navbar = document.querySelector('.navbar');
        navbar.style.opacity = 1;
        navbar.style.transform = "translateY(0)";
        [].forEach.call(document.querySelectorAll('main>.section'), function(element) {
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        });
    }
}

// Add partial support for old browsers that do not support ES6 syndex
window.onerror = function(message, source, lineno, colno, error) {
    console.log(error);
    errorHandler();
}