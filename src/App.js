import React from 'react';
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
      <sectionContext.Provider value={{ currentSection: currentSection, setCurrentSection: setCurrentSection }}>
        <Navbar />
      </sectionContext.Provider>
      <Background />
    </div>
  );
}

export { sectionContext };
export default App;
