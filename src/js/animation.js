export const initAnimation = () => {
    let delay = 0;
    const navbar = document.getElementById('navbar');
    const sections = document.getElementsByClassName('section');

    try {
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
        for (const element of [navbar, ...sections]) {
            animationObserver.observe(element);
        }
    } catch (error) {
        navbar.classList.add('show');
        delay += 500;
        for (let i = 0; i < sections.length; i++) {
            setTimeout(() => sections[i].classList.add('show'), delay);
            delay += 500;
        }
    }
};