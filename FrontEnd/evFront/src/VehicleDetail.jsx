import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ScooterData from './ScooterData';
import AutoData from './AutoData';  // Import AutoData
import './VehicleDetail.css';

function VehicleDetail() {
  const { vehicleName } = useParams();
  console.log("Vehicle Name from URL:", vehicleName);

  // Combine ScooterData and AutoData
  const combinedData = [...ScooterData, ...AutoData];
  const vehicle = combinedData.find((item) => item.name === vehicleName);

  if (!vehicle) {
    console.log("Vehicle not found in data.");
    return (
      <div className="vehicle-detail">
        <h1>Vehicle not found</h1>
        <p>Sorry, we couldn't find the vehicle you're looking for.</p>
        <Link to="/">Go back to the list of scooters and autos</Link>
      </div>
    );
  }

  return (
    <div className="vehicle-detail">
      <h1>{vehicle.name}</h1>
      <div className="vehicle-images">
        {vehicle.images.map((image, index) => (
          <figure key={index}>
            <img src={image} alt={`${vehicle.name} Image ${index + 1}`} />
          </figure>
        ))}
      </div>
      <p><strong className="dark-field">Company:&nbsp;</strong> {vehicle.company}</p>
      <p><strong className="dark-field">Price:&nbsp;</strong> {vehicle.price}</p>
      <p><strong className="dark-field">Battery Life:&nbsp;</strong> {vehicle.batteryLife}</p>
      <p><strong className="dark-field">Top Speed:&nbsp;</strong> {vehicle.topSpeed}</p>
      <p><strong className="dark-field">Charging Time:&nbsp;</strong> {vehicle.chargingTime}</p>
      <p><strong className="dark-field">Variants:&nbsp;</strong> {vehicle.variants}</p>
      <a href={vehicle.website} target="_blank" rel="noopener noreferrer">
        Learn More
      </a>
    </div>
  );
}

export default VehicleDetail;
