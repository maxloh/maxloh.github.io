import React from 'react';
import Section1 from './components/Section1.js';
import Section2 from './components/Section2.js';
import Section3 from './components/Section3.js';
import Section4 from './components/Section4.js';
import Navbar from './components/Navbar.js';
import Background from './components/Background.js';
import './App.scss';

const sectionContext = React.createContext();

function App() {
  const getPlatform = () => (matchMedia('(pointer:fine)').matches && window.innerWidth >= 768) ? 'desktop' : 'mobile';
  const [platform, setPlatform] = React.useState(getPlatform());
  const [currentSection, setCurrentSection] = React.useState('about-me');

  window.addEventListener('resize', () => setPlatform(getPlatform()));

  return (
    <div className={`App ${platform}`}>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <sectionContext.Provider value={{ currentSection: currentSection, setCurrentSection: setCurrentSection }}>
        <Navbar />
      </sectionContext.Provider>
      <Background />
    </div>
  );
}

export { sectionContext };
export default App;
