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
      setTimeout(() => this.setState(state => ({
        ...state,
        sectionsPosition: {
          ...state.sectionsPosition,
          [section]: navigateToRight ? 'left' : 'right'
        }
      })), delay);
      delay += animationDuration;
    }

    setTimeout(() => this.setState(state => ({
      ...state,
      sectionsPosition: {
        ...state.sectionsPosition,
        [detination]: ''
      }
    })), delay);
    delay += animationDuration;
    setTimeout(() => this.transitioning = false, delay);
  };

  wheelHandler = (event) => {
    const destinationIndex = event.deltaY > 0 ? hrefList.indexOf(this.state.currentSection) + 1 : hrefList.indexOf(this.state.currentSection) - 1;
    if (destinationIndex >= 0 && destinationIndex < hrefList.length) {
      this.navigate(hrefList[destinationIndex]);
    }
  };

  keyPressHandler = (event) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    const destinationIndex = event.key === 'ArrowDown' ? hrefList.indexOf(this.state.currentSection) + 1 : hrefList.indexOf(this.state.currentSection) - 1;
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
    window.addEventListener('keydown', this.keyPressHandler);
  }

  render() {
    return (
      <div className={`App ${this.state.platform}`} onWheel={this.wheelHandler}>
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
