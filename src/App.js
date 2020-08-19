import React from 'react';
import Section, { hrefList, animationDuration } from './components/Section.js';
import Navbar from './components/Navbar.js';
import Background from './components/Background.js';
import './App.scss';

const sectionContext = React.createContext();

function App() {
  const getPlatform = () => (matchMedia('(pointer:fine)').matches && window.innerWidth >= 768) ? 'desktop' : 'mobile';
  const navigate = (detination) => {
    setCurrentSection(detination);
    const detinationIndex = hrefList.indexOf(detination);
    const currentSectionIndex = hrefList.indexOf(currentSection);
    const navigateToRight = detinationIndex > currentSectionIndex;
    const sectionsToAnimate = navigateToRight ? hrefList.slice(currentSectionIndex, detinationIndex) : hrefList.slice(detinationIndex + 1, currentSectionIndex + 1).reverse();
    let animationDelay = 0;

    for (const section of sectionsToAnimate) {
      setTimeout(() => sectionsPosition[section].setposition(navigateToRight ? 'left' : 'right'), animationDelay);
      animationDelay += animationDuration;
    }
    setTimeout(() => sectionsPosition[detination].setposition(''), animationDelay);
  };

  const [platform, setPlatform] = React.useState(getPlatform());
  const [currentSection, setCurrentSection] = React.useState('header');
  const sectionsPosition = Object.assign({}, ...hrefList.map(href => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [position, setposition] = React.useState(href === 'header' ? '' : 'right');
    return { [href]: { position, setposition } };
  }));
  window.addEventListener('resize', () => setPlatform(getPlatform()));

  return (
    <div className={`App ${platform}`}>
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
