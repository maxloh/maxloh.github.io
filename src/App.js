import React from 'react';
import Section, { hrefList, animationDuration } from './components/Section.js';
import Navbar from './components/Navbar.js';
import Background from './components/Background.js';
import './App.scss';

const getPlatform = () => (matchMedia('(pointer:fine)').matches && window.innerWidth >= 768) ? 'desktop' : 'mobile';
const sectionContext = React.createContext();

function App() {
  const [platform, setPlatform] = React.useState(getPlatform());
  const [currentSection, setCurrentSection] = React.useState('header');
  const sectionsPosition = Object.assign({}, ...hrefList.map(href => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [position, setposition] = React.useState(href === 'header' ? '' : 'right');
    return { [href]: { position, setposition } };
  }));
  let navigating = false;

  const navigate = (detination) => {
    if (navigating) return;
    navigating = true;
    setCurrentSection(detination);
    const detinationIndex = hrefList.indexOf(detination);
    const currentSectionIndex = hrefList.indexOf(currentSection);
    const navigateToRight = detinationIndex > currentSectionIndex;
    const sectionsToAnimate = navigateToRight ? hrefList.slice(currentSectionIndex, detinationIndex) : hrefList.slice(detinationIndex + 1, currentSectionIndex + 1).reverse();
    let delay = 0;

    for (const section of sectionsToAnimate) {
      setTimeout(() => sectionsPosition[section].setposition(navigateToRight ? 'left' : 'right'), delay);
      delay += animationDuration;
    }
    setTimeout(() => sectionsPosition[detination].setposition(''), delay);
    delay += animationDuration;
    setTimeout(() => navigating = false, animationDuration);
  };

  const wheelHandler = (event) => {
    console.log(navigating)
    if (navigating) return;
    navigating = true;
    const destinationIndex = event.deltaY > 0 ? hrefList.indexOf(currentSection) + 1 : hrefList.indexOf(currentSection) - 1;
    if (destinationIndex >= 0 && destinationIndex < hrefList.length) {
      navigate(hrefList[destinationIndex]);
    }
    setTimeout(() => navigating = false, animationDuration);
  };

  const keyPressHandler = (event) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    if (navigating) return;
    navigating = true;
    const destinationIndex = event.key === 'ArrowDown' ? hrefList.indexOf(currentSection) + 1 : hrefList.indexOf(currentSection) - 1;
    if (destinationIndex >= 0 && destinationIndex < hrefList.length) {
      navigate(hrefList[destinationIndex]);
    }
    setTimeout(() => navigating = false, animationDuration);
  };

  window.addEventListener('resize', () => setPlatform(getPlatform()));
  window.addEventListener('keydown', keyPressHandler);

  return (
    <div className={`App ${platform}`} onWheel={wheelHandler} onKeydown={keyPressHandler}>
      <sectionContext.Provider value={{ currentSection: currentSection, navigate: navigate, sectionsPosition: sectionsPosition }}>
        {hrefList.map((href, index) => (
          <Section href={href} key={index} />
        ))}
        <Navbar />
        <Background />
      </sectionContext.Provider>
    </div>
  );
}

export { sectionContext };
export default App;
