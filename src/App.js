import React from 'react';
import Section, { hrefList, animationDuration } from './components/Section.js';
import Navbar from './components/Navbar.js';
import Background from './components/Background.js';
import './App.scss';

const getPlatform = () => (matchMedia('(pointer:fine)').matches && window.innerWidth >= 768) ? 'desktop' : 'mobile';
const sectionContext = React.createContext();

class App extends React.Component {
  static transitioning = false;

  navigate = (detination) => {
    if (this.transitioning) return;
    this.transitioning = true;

    const detinationIndex = hrefList.indexOf(detination);
    const currentSectionIndex = hrefList.indexOf(this.state.currentSection);
    const navigateToRight = detinationIndex > currentSectionIndex;
    const sectionsToAnimate = navigateToRight ? hrefList.slice(currentSectionIndex, detinationIndex) : hrefList.slice(detinationIndex + 1, currentSectionIndex + 1).reverse();
    let delay = 0;

    this.setState({ currentSection: detination });
    for (const section of sectionsToAnimate) {
      setTimeout(() => this.setState(state => {
        state.sectionsPosition[section] = navigateToRight ? 'left' : 'right';
        return state;
      }), delay);
      delay += animationDuration;
    }
    setTimeout(() => this.setState(state => {
      state.sectionsPosition[detination] = '';
      return state;
    }), delay);
    delay += animationDuration;
    setTimeout(() => this.transitioning = false, delay);
  };

  scroll = (direction) => {
    const destinationIndex = direction === 'down' ? hrefList.indexOf(this.state.currentSection) + 1 : hrefList.indexOf(this.state.currentSection) - 1;
    if (destinationIndex >= 0 && destinationIndex < hrefList.length) {
      this.navigate(hrefList[destinationIndex]);
    }
  };

  constructor() {
    super();
    this.state = {
      platform: getPlatform(),
      currentSection: 'header',
      sectionsPosition: Object.assign({}, ...hrefList.map(href => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const position = href === 'header' ? '' : 'right';
        return { [href]: position };
      }))
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.setState({ platform: getPlatform() }));
    window.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
      this.scroll(event.key === 'ArrowDown' ? 'down' : 'up');
    });
  }

  render() {
    return (
      <div className={`App ${this.state.platform}`} onWheel={event => this.scroll(event.deltaY > 0 ? 'down' : 'up')}>
        <sectionContext.Provider value={{ currentSection: this.state.currentSection, navigate: this.navigate, sectionsPosition: this.state.sectionsPosition }}>
          {hrefList.map((href, index) => (
            <Section href={href} key={index} />
          ))}
          <Navbar />
          <Background />
        </sectionContext.Provider>
      </div>
    );
  }
}

export { sectionContext };
export default App;
