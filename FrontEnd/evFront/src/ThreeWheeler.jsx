import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ThreeWheeler.css'; // Importing the CSS file

function ThreeWheeler() {
  const scooters = [
    { company: 'Kinetic Green', name: 'Safar Smart', image: '/3wheel/kineticGreen/green.jpg' },
    { company: 'Kinetic Green', name: 'Super DX', image: '/3wheel/kineticGreen/superDx.jpg' },
    { company: 'Kinetic Green', name: 'Safar Jumbo Ranger', image: '/3wheel/kineticGreen/jumbo.png' },
    { company: 'Mahindra', name: 'Treo', image: '/3wheel/mahindra/treo.png' },
    { company: 'Mahindra', name: 'e-Alfa Plus', image: '/3wheel/mahindra/eAlpha.png' },
    { company: 'Mahindra', name: 'e-Alfa Cargo', image: '/3wheel/mahindra/e-alfaCar.png' },
    { company: 'Mahindra', name: 'Zor Grand DV Plus', image: '/3wheel/mahindra/zor.jpg' },
    { company: 'Mahindra', name: 'Treo Zor', image: '/3wheel/mahindra/treoZor.jpg' },
    { company: 'Bajaj', name: 'RE E-TEC', image: '/3wheel/t-tec.avif' },
    { company: 'Omega Seiki Mobility (OSM)', name: 'Rage plus', image: '/3wheel/omega/rage+.png' },
    { company: 'Omega Seiki Mobility (OSM)', name: 'Rage+ Frost', image: '/3wheel/omega/rage+fost.png' },
    { company: 'PIAGGIO', name: 'Ape E City FX Max', image: '/3wheel/ape/ape.png' },
    { company: 'PIAGGIO', name: 'Ape E-Xtra', image: '/3wheel/ape/apeCar.jpg' },
    { company: 'ATUL GreenTech', name: 'Atul Mobili', image: '/3wheel/atul/mobil.jpg' },
    { company: 'ATUL GreenTech', name: 'Atul Energie', image: '/3wheel/atul/energie.jpg' },
    { company: 'ATUL Auto', name: 'Atul Elite', image: '/3wheel/atul/elite.jpeg' },
    { company: 'Euler Motors', name: 'HiLoad EV', image: '/3wheel/euler.jpeg' },
    { company: 'Lohia Auto', name: 'Narain E-Rickshaw', image: '/3wheel/narain.jpeg' },
    { company: 'Lohia Auto', name: 'Narain E-Auto', image: '/3wheel/auto1.png' },
    { company: 'ALTIGREEN', name: 'Low Deck', image: '/3wheel/neEV.webp' }
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredScooters = scooters.filter(scooter =>
    scooter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scooter.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scootersByCompany = filteredScooters.reduce((acc, scooter) => {
    (acc[scooter.company] = acc[scooter.company] || []).push(scooter);
    return acc;
  }, {});

  return (
    <div className="three-wheeler-container">
      <h1 style={{ textAlign: 'center' }}>Three Wheelers</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for a 3 wheeler or company..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {Object.keys(scootersByCompany).map((company, index) => (
        <section key={index}>
          <h2 className="company-heading">{company}</h2>
          <div className="card-container">
            {scootersByCompany[company].map((scooter, idx) => (
              <div key={idx} className="card">
                <Link to={`/vehicle/${scooter.name}`}>
                  <img
                    src={scooter.image}
                    alt={scooter.name}
                  />
                  <h3>{scooter.name}</h3>
                </Link>
              </div>
            ))}
          </div>
          <hr className="company-divider" /> {/* Divider line after each company's vehicles */}
        </section>
      ))}
    </div>
  );
}

export default ThreeWheeler;
