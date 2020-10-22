import React from 'react';
import './Header.scss';

function Header(props) {
  return (
    <header className={props.position} style={{ flexDirection: 'column', alignItems: 'start' }}>
      <h1 className="greeting" style={{ fontSize: '8rem', fontWeight: 300 }}>Hi, I am Max Loh.</h1>
      <h2 className="description" style={{ fontSize: '4rem', fontWeight: 300 }}>A Hong Kong based front end developer.</h2>
      <div className="mouse-container"><div className="mouse"></div></div>
    </header>
  );
}

export default Header;
