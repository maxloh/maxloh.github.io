import React from 'react';
import { sectionContext } from '../App.js';
import { hrefList } from './Section.js';
import './Navbar.scss';

function NavItem(props) {
  const context = React.useContext(sectionContext);
  return (
    <li className="nav-item">
      <a className={`nav-link ${context.currentSection === props.href && 'active'}`} href={`#${props.href}`} onClick={() => context.navigate(props.href)}>
        {props.href[0].toUpperCase() + props.href.slice(1).replace(/-/, ' ')}
      </a>
    </li>
  );
}

function Navbar() {
  console.log();
  return (
    <nav className="navbar">
      <ul className="nav">
        {hrefList.slice(1).map((href, index) => (
          <NavItem href={href} key={index} />
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
