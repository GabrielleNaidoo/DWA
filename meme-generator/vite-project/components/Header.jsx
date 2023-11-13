import React from 'react';

function Header() {
  return (
    <div className="header">
      <img
        className="troll-image"
        src="/images/troll-face.png"
        alt="troll face image"
      ></img>
      <h2 className="header-primary">Meme Generator</h2>
      <h4 className="header-secondary">React Course- Project 3</h4>
    </div>
  );
}

export default Header;
