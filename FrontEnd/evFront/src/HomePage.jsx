import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './HomePage.css';
import markerImage from './marker.png';

function HomePage() {
    const [location, setLocation] = useState('');
    const [stations, setStations] = useState([]);
    const [error, setError] = useState('');
    const [viewport, setViewport] = useState({
        latitude: 20.5937, // Default latitude
        longitude: 78.9629, // Default longitude
        zoom: 4,
    });
    const [selectedStation, setSelectedStation] = useState(null);
    const navigate = useNavigate();
    const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setStations([]);
        setSelectedStation(null);

        try {
            // Fetch geolocation data from Mapbox
            const mapboxResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`, {
                params: { access_token: mapboxAccessToken, limit: 1 },
            });

            if (mapboxResponse.data.features.length === 0) {
                throw new Error('Location not found.');
            }

            const { center } = mapboxResponse.data.features[0];
            const [longitude, latitude] = center;
            setViewport({ latitude, longitude, zoom: 11 });

            // Fetch charging station data from backend
            const apiUrl = import.meta.env.VITE_API_URL;

            const response = await axios.get(`${apiUrl}/api/stations`, {
                params: { lat: latitude, long: longitude },
                });
            setStations(response.data.stations || []); // Ensure fallback to empty array
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err.response?.data?.error || err.message || 'Error fetching data. Please check your backend server.');
        }
    };

    const handleStationClick = (station) => {
        setSelectedStation(station);
        setViewport({
            latitude: station.latitude, // Updated based on the new response structure
            longitude: station.longitude,
            zoom: 12,
        });
    };

    const handleNavigate = () => {
        if (selectedStation) {
            const destinationLat = selectedStation.latitude;
            const destinationLng = selectedStation.longitude;
            // Pass origin as default coordinates or as needed
            const originLat = viewport.latitude; // Example: Using current map center as origin
            const originLng = viewport.longitude;
            navigate(`/direction?origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}`);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {error && <div className="error">{error}</div>} {/* Error display */}

            <Map
                {...viewport}
                style={{ width: '100%', height: '600px' }}
                mapboxAccessToken={mapboxAccessToken}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
            >
                {stations.map((station) => (
                    <Marker
                        key={`${station.name}-${station.address}`}
                        latitude={station.latitude}
                        longitude={station.longitude}
                    >
                        <div onClick={() => handleStationClick(station)} style={{ cursor: 'pointer' }}>
                            <img src={markerImage} alt="Marker" style={{ width: '30px', height: '30px' }} />
                        </div>
                    </Marker>
                ))}

                {selectedStation && (
                    <Popup
                        latitude={selectedStation.latitude}
                        longitude={selectedStation.longitude}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => setSelectedStation(null)}
                        anchor="top"
                    >
                        <div>
                            <h5>{selectedStation.name || 'Station Name Not Available'}</h5>
                            <p><strong>Address:</strong> {selectedStation.address || 'Address information not available'}</p>
                            <p><strong>Rating:</strong> {selectedStation.rating || 'N/A'}</p>
                            <p><strong>Total User Ratings:</strong> {selectedStation.user_ratings_total || 'N/A'}</p>
                            <button onClick={handleNavigate}>Navigate</button>
                        </div>
                    </Popup>
                )}
                <NavigationControl position="bottom-right" />
            </Map>
        </div>
    );
}

export default HomePage;
