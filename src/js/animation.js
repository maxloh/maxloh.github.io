import 'intersection-observer';

export const initAnimation = () => {
    let delay = 0;
    const navbar = document.getElementById('navbar');
    const section = document.getElementsByClassName('section');

    const animationObserver = new IntersectionObserver((entries, animationObserver) => {
        for (const entry of entries) {
            // Animate element when it enter viewport
            if (entry.intersectionRatio > 0) {
                animationObserver.unobserve(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('show');
                    delay -= 500;
                }, delay);
                delay += 500;
            }
        }
    });

    // observe 'main>.section' and animate #navbar on page load
    for (const element of [navbar, ...section]) {
        animationObserver.observe(element);
    }
};