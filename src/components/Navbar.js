import React from 'react';
import { sectionContext } from '../App.js';
import './Navbar.scss';

function NavItem(props) {
  const context = React.useContext(sectionContext);
  return (
    <li className="nav-item">
      <a className={`nav-link ${context.currentSection === props.href && 'active'}`} href={`#${props.href}`} onClick={() => context.setCurrentSection(props.href)}>{props.name}</a>
    </li>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav">
        <NavItem href="about-me" name="About me" />
        <NavItem href="education" name="Education" />
        <NavItem href="skills" name="Skills" />
        <NavItem href="projects" name="Projects" />
      </ul>
    </nav>
  );
}

export default Navbar;
