import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MapPage from './MapPage';
import TwoWheeler from './TwoWheeler';
import ThreeWheeler from './ThreeWheeler';
import Direction from './Direction';
import VehicleDetail from './VehicleDetail';
import './App.css';
import logo from './assets/logo1.png';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the EV Application</h1>
      <p id='paras'>Discover electric vehicles, plan your routes, and explore eco-friendly travel options!</p>
      <div className="features">
        <div className="feature-card">
          <h3>Two Wheeler</h3>
          <p>Explore our collection of electric two-wheelers tailored for urban commuting.</p>
          <Link to="/two-wheeler" className="feature-link">Explore Two-Wheelers</Link>
        </div>
        <div className="feature-card">
          <h3>Three Wheeler</h3>
          <p>Discover electric three-wheelers for versatile and efficient transport options.&nbsp;&nbsp;&nbsp;</p>
          <Link to="/three-wheeler" className="feature-link">Explore Three-Wheelers</Link>
        </div>
        <div className="feature-card">
          <h3>Map and Directions</h3>
          <p>Find EV charging stations and navigate easily to your destination.</p>
          <Link to="/map" className="feature-link">View Map</Link>
        </div>
      </div>
      <div className="tagline">
            Drive the Future
        </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="EV Application Logo" />
          </Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/two-wheeler">Two Wheeler</Link>
            </li>
            <li>
              <Link to="/three-wheeler">Three Wheeler</Link>
            </li>
            <li>
              <Link to="/map">Map Page</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/two-wheeler" element={<TwoWheeler />} />
        <Route path="/three-wheeler" element={<ThreeWheeler />} />
        <Route path="/direction" element={<Direction />} />
        <Route path="/vehicle/:vehicleName" element={<VehicleDetail />} />
      </Routes>
    </div>
  );
}

export default App;
