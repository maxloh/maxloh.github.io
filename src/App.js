import React from 'react';
import Section, { hrefList } from './components/Section.js';
import Navbar from './components/Navbar.js';
import Background from './components/Background.js';
import './App.scss';

const sectionContext = React.createContext();

function App() {
  const getPlatform = () => (matchMedia('(pointer:fine)').matches && window.innerWidth >= 768) ? 'desktop' : 'mobile';
  const navigate = (detination) => {
    setCurrentSection(detination);

  };

  const [platform, setPlatform] = React.useState(getPlatform());
  const [currentSection, setCurrentSection] = React.useState('about-me');
  window.addEventListener('resize', () => setPlatform(getPlatform()));

  return (
    <div className={`App ${platform}`}>
      {hrefList.map(href => (
        <Section href={href} />
      ))}
      <sectionContext.Provider value={{ currentSection: currentSection, navigate: navigate }}>
        <Navbar />
      </sectionContext.Provider>
      <Background />
    </div>
  );
}

export { sectionContext };
export default App;
