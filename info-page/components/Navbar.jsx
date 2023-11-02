import React from 'react';
import logo from '../images/react-icon-small.png';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__left">
        <img src={logo} alt="react-icon" className="react-logo" />
        <h3 className="primary-heading">ReactFacts</h3>
      </div>
      <div className="navbar__right">
        <h4 className="secondary-heading">React Course - Project 1</h4>
      </div>
    </div>
  );
}

export default Navbar;
