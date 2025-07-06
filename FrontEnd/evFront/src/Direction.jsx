import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Direction = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const destination = params.get('destination');

    const [pickup, setPickup] = useState(null);
    const [pickupName, setPickupName] = useState("");
    const [destinationName, setDestinationName] = useState("");
    const [error, setError] = useState(null);

    const mapRef = useRef(null);
    const directionsRef = useRef(null);

    // Get live location using browser geolocation
    const getLiveLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const coords = [longitude, latitude];
                    setPickup(coords);
                    fetchPlaceName(coords, setPickupName);
                },
                (err) => {
                    console.warn("Location access denied by user", err);
                    setError("Location access denied. Please enable location in your browser.");
                },
                { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    // Get place name from Mapbox Geocoding API
    const fetchPlaceName = (coords, setName) => {
        const [lng, lat] = coords;
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
            .then(res => res.json())
            .then(data => {
                if (data.features?.length > 0) {
                    setName(data.features[0].place_name);
                }
            })
            .catch(() => setError("Failed to retrieve place name."));
    };

    // Get live location on component mount
    useEffect(() => {
        getLiveLocation();
    }, []);

    // Initialize map directions when pickup & destination are ready
    useEffect(() => {
        if (!mapRef.current || !destination) return;

        const map = mapRef.current.getMap();

        if (!directionsRef.current) {
            directionsRef.current = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                unit: 'metric',
                profile: 'mapbox/driving',
                interactive: false,
            });
            map.addControl(directionsRef.current, 'top-left');
        }

        const directions = directionsRef.current;
        const [destLat, destLng] = destination.split(',').map(Number);
        const destCoords = [destLng, destLat];

        directions.setDestination(destCoords);
        fetchPlaceName(destCoords, setDestinationName);

        if (pickup) {
            directions.setOrigin(pickup);
        }

        return () => {
            if (map && directionsRef.current) {
                map.removeControl(directionsRef.current);
                directionsRef.current = null;
            }
        };
    }, [pickup, destination]);

    return (
        <div style={{ paddingTop: '40px' }}>
            <h1>Navigate to Station</h1>

            {pickupName && <p><strong>Your Location:</strong> {pickupName}</p>}
            {destinationName && <p><strong>Destination:</strong> {destinationName}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button onClick={getLiveLocation} style={{ marginBottom: '10px' }}>
                Use My Live Location
            </button>

            <ReactMapGL
                ref={mapRef}
                initialViewState={{
                    longitude: 78.9629,
                    latitude: 20.5937,
                    zoom: 7,
                }}
                style={{ height: '700px', width: '100%' }}
                mapboxAccessToken={mapboxgl.accessToken}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
            >
                <NavigationControl position="bottom-right" />
            </ReactMapGL>
        </div>
    );
};

export default Direction;
