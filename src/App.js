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
    const navigateDirection = detinationIndex > currentSectionIndex ? 'left' : 'right';
    const sectionsToAnimate = navigateDirection === 'left' ? hrefList.slice(currentSectionIndex, detinationIndex + 1) : hrefList.slice(detinationIndex, currentSectionIndex + 1);
    for (const section of sectionsToAnimate) {
      sectionsPosition[section].setposition(navigateDirection);
    }
  };

  const [platform, setPlatform] = React.useState(getPlatform());
  const [currentSection, setCurrentSection] = React.useState('about-me');
  const sectionsPosition = Object.assign({}, ...hrefList.map(href => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [position, setposition] = React.useState(href === 'header' ? '' : '');
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
