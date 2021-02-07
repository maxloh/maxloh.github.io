export const initAnimation = () => {
  const delayBetweenTransitions = 500;

  try {
    let firstRun = true;
    const animationObserver = new IntersectionObserver(
      (entries, animationObserver) => {
        let delay = firstRun ? 0 : 250;

        // prettier-ignore
        // Animate element within the viewport
        for (const entry of entries.filter(entry => entry.intersectionRatio > 0)) {
          animationObserver.unobserve(entry.target);

          for (const child of entry.target.children) {
            child.style.transitionDelay = `${delay}ms`;
          }
          entry.target.classList.add('show');

          // While animating multiple sections (e.g. on page load),
          // delay the animation of subsequent sections
          delay += delayBetweenTransitions;
        }
        firstRun = false;
      }
    );

    // prettier-ignore
    for (const element of [document.getElementById('navbar'), ...document.getElementsByTagName('section')]) {
      animationObserver.observe(element);
    }
  } catch (error) {
    let delay = 0;
    const sections = document.getElementsByTagName('section');

    document.getElementById('navbar').classList.add('show');
    delay += delayBetweenTransitions;

    for (let i = 0; i < sections.length; i++) {
      setTimeout(() => sections[i].classList.add('show'), delay);
      delay += delayBetweenTransitions;
    }
  }
};
