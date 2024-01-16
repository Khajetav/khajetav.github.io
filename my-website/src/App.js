import React from 'react';
import logo from './resources/reactLogo.png';
import './App.css';
import StarryBackground from './StarryBackground';
import circle1 from './resources/circle1.png';
import circle2 from './resources/circle2.png';
import circle3 from './resources/circle3.png';
import circle4 from './resources/circle4.png';

function App() {
  return (
    <div className="App">
      <StarryBackground/>
        <header className="App-header">
        {/* rotating react logo to flex that I used react*/}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Khajetav
        </p>


        <div className="profile-section">
        <RotatingSunComponent />
        </div>
        <p>Hello</p>
        <div className="cv-links">
          <a href="cven" target="_blank" rel="noopener noreferrer">My CV (EN)</a>
          <a href="cvlt" target="_blank" rel="noopener noreferrer">My CV (LT)</a>
        </div>
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
