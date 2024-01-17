import './App.css';
import React from 'react';

import StarryBackground from './components/StarryBackground';
import ImageToAscii from './components/ImageToAscii';

import logo from './resources/reactLogo.png';
import backgroundFog from './resources/backgroundFog.png';
import circle1 from './resources/circle1.png';
import circle2 from './resources/circle2.png';
import circle3 from './resources/circle3.png';
import circle4 from './resources/circle4.png';

function App() {
  return (
      <div className="App">
          {/* non functional, decorative pieces*/}
          <StarryBackground className="StarryBackgroundComponent" />
          <div className="ImgToAsciiComponent">
              <ImageToAscii imageUrl={backgroundFog} fontSize={0.3} resolutionFactor={0.32} />
          </div>    
          <RotatingSunComponent className="RotatingSunComponent" />
          


          <div className="cv-links">
              <a href="cven" target="_blank" rel="noopener noreferrer">My CV (EN)</a>
              <a href="cvlt" target="_blank" rel="noopener noreferrer">My CV (LT)</a>
          </div>

          {/* rotating react logo to flex that I used react*/}

          <header className="App-header">

              <img src={logo} className="App-logo" alt="logo" />

          </header>
      
    </div>
  );
}

function RotatingSunComponent() {
  return (
    <div className="rotating-sun">
      <img src={circle4} alt="Circle 4" className="circle circle4"/>
      <img src={circle3} alt="Circle 3" className="circle circle3"/>
      <img src={circle2} alt="Circle 2" className="circle circle2"/>
      <img src={circle1} alt="Circle 1" className="circle circle1"/>
    </div>
  );
}


export default App;
