export default function initAnimation() {
  const delayBetweenTransitions = 500;

  try {
    let firstRun = true;
    const animationObserver = new IntersectionObserver(
      (entries, animationObserver) => {
        let delay = firstRun ? 0 : 250;

        // Animate element within the viewport
        for (const entry of entries.filter(
          entry => entry.intersectionRatio > 0
        )) {
          animationObserver.unobserve(entry.target);

          entry.target.style.setProperty(
            '--section-transition-delay',
            `${delay}ms`
          );
          entry.target.classList.remove('hide');
          setTimeout(() => {
            entry.target.style.removeProperty('--section-transition-delay');
          }, delay + 100);

          // While animating multiple sections (e.g. on page load),
          // delay the animation of subsequent sections
          delay += delayBetweenTransitions;
        }
        firstRun = false;
      }
    );

    for (const element of [
      document.getElementById('navbar'),
      ...document.getElementsByTagName('section')
    ]) {
      animationObserver.observe(element);
    }
  } catch (error) {
    let delay = 0;
    const sections = document.getElementsByTagName('section');

    document.getElementById('navbar').classList.remove('hide');
    delay += delayBetweenTransitions;

    for (let i = 0; i < sections.length; i++) {
      setTimeout(() => sections[i].classList.remove('hide'), delay);
      delay += delayBetweenTransitions;
    }
  }
}
