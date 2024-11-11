import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TwoWheeler.css';

function TwoWheeler() {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const scooters = [
    { company: 'Ather', name: 'Ather 450S', image: '/2Wheel/ather/scoo.png' },
    {company: 'Ather', name: 'Rizta', image: '/2Wheel/ather/rizta.webp', className: 'tall-image'},
    { company: 'Ampere', name: 'Magnus LT', image: '/2Wheel/ampere/magnus lt.png' },
    { company: 'Ampere', name: 'Magnus EX', image: '/2Wheel/ampere/magnus ex.webp' },
    { company: 'Ampere', name: 'Nexus EX', image: '/2Wheel/ampere/nexus ex.png' },
    { company: 'Ampere', name: 'Primus', image: '/2Wheel/ampere/primus.png' },
    { company: 'Ampere', name: 'Reo Li Plus', image: '/2Wheel/ampere/reo.webp' },
    { company: 'Ampere', name: 'Zeal', image: '/2Wheel/ampere/zeal.png' },
    { company: 'Kinetic Green', name: 'E-LUNA', image: '/2Wheel/green/luna.webp' },
    { company: 'Kinetic Green', name: 'E-Zulu', image: '/2Wheel/green/zulu.jpg' },
    { company: 'Kinetic Green', name: 'Zoom', image: '/2Wheel/green/zoom.jpg' },
    { company: 'Kinetic Green', name: 'Flex', image: '/2Wheel/green/flex.jpg' },
    { company: 'Kinetic Green', name: 'Zing', image: '/2Wheel/green/zing.webp' },
    { company: 'BattRE', name: 'LOEV', image: '/2Wheel/batt/loev.png' },
    { company: 'BattRE', name: 'One', image: '/2Wheel/batt/one.jpg' },
    { company: 'EeVe', name: 'Ahava', image: '/2Wheel/EeVe/ahava.webp' },
    { company: 'EeVe', name: 'Atreo', image: '/2Wheel/EeVe/atreo.webp' },
    { company: 'EeVe', name: 'Xeniaa', image: '/2Wheel/EeVe/xeniaa.jpg' },
    { company: 'Hero', name: 'Flash LX', image: '/2Wheel/hero/flash1.png' },
    { company: 'Hero', name: 'Optima CX', image: '/2Wheel/hero/optima.png' },
    { company: 'Hero', name: 'Photon LP', image: '/2Wheel/hero/photon.png' },
    { company: 'Joy', name: 'e-bike Gen Next Nanu', image: '/2Wheel/joy/nanu.webp' },
    { company: 'Joy', name: 'e-bike Glob', image: '/2Wheel/joy/Joy e-Bike Glob.png' },
    { company: 'Joy', name: 'e-bike Mihos', image: '/2Wheel/joy/mihos.png' },
    { company: 'Okinava', name: 'iPrase+', image: '/2Wheel/okinava/iPrase+.png' },
    { company: 'Okinava', name: 'okhi-90', image: '/2Wheel/okinava/okhi-90.png' },
    { company: 'Okinava', name: 'Ridge+', image: '/2Wheel/okinava/ridge+.webp' },
    { company: 'Okaya', name: 'ClassiQ', image: '/2Wheel/okaya/classiq.jpeg' },
    { company: 'Okaya', name: 'Freedum', image: '/2Wheel/okaya/free.webp' },
    { company: 'Ola', name: 'Roadster', image: '/2Wheel/ola/roadster.png' },
    { company: 'Ola', name: 'S1', image: '/2Wheel/ola/s1.png' },
    { company: 'Pure EV', name: 'ETrance Neo', image: '/2Wheel/pure/etrance.jpeg' },
    { company: 'Pure EV', name: 'EPluto 7G', image: '/2Wheel/pure/scooter.webp', className: 'tall-image' },
    { company: 'TVS', name: 'X Smart', image: '/2Wheel/tvs/x-smart.webp' },
    { company: 'TVS', name: 'iQube', image: '/2Wheel/tvs/TVS_iqube.png' },
    { company: 'Bajaj', name: 'Chetak', image: '/2Wheel/chetak.png' },
    { company: 'Hala', name: 'Hala', image: '/2Wheel/hala.webp' },
    { company: 'Oben Electric', name: 'Oben rorr', image: '/2Wheel/oben rorr.avif' },
    { company: 'Revolt Motors', name: 'Revolt RV400', image: '/2Wheel/revolt.webp' },
    { company: 'Simple Energy', name: 'Simple Energy One', image: '/2Wheel/simple.png' },
    { company: 'Vida', name: 'V1', image: '/2Wheel/v1.jpg' },
    { company: 'Komaki', name: 'Komaki CAT 2.0', image: '/2Wheel/komaki/cat.jpg' },
    { company: 'Komaki', name: 'Komaki Flora', image: '/2Wheel/komaki/flora.jpg' },
    { company: 'Komaki', name: 'Komaki Ranger', image: '/2Wheel/komaki/ranger.jpg' },
    { company: 'Komaki', name: 'Komaki TN-95', image: '/2Wheel/komaki/tn.jpg' },
    { company: 'Komaki', name: 'Komaki XGT-X1', image: '/2Wheel/komaki/x1.jpg' }
  ];

  // Filter scooters based on the search term
  const filteredScooters = scooters.filter((scooter) =>
    scooter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scooter.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group the filtered scooters by company
  const scootersByCompany = filteredScooters.reduce((acc, scooter) => {
    (acc[scooter.company] = acc[scooter.company] || []).push(scooter);
    return acc;
  }, {});

  return (
    <div className="two-wheeler-container">
      <h1 style={{ textAlign: 'center' }}>Two Wheeler Scooters</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search scooter or company"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* If no scooters match the search term, show "No vehicle found" */}
      {filteredScooters.length === 0 ? (
        <div className="no-vehicle">
          <h2>No vehicle found</h2>
        </div>
      ) : (
        Object.keys(scootersByCompany).map((company, index) => (
          <section key={index}>
            <h1>{company}</h1>
            <div className="card-container">
              {scootersByCompany[company].map((scooter, idx) => (
                <div key={idx} className="card">
                  <Link to={`/vehicle/${scooter.name}`}>
                  <img
                      src={scooter.image}
                      alt={scooter.name}
                      className={scooter.className || ''}
                  />

                    <h3>{scooter.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
            <hr className="company-divider" /> {/* Divider line after each company's vehicles */}
          </section>
        ))
      )}
    </div>
  );
}

export default TwoWheeler;
