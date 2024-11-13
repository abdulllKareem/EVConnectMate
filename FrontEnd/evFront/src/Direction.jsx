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

    // Function to get live location of the user with Mapbox fallback
    const getLiveLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const coords = [longitude, latitude];
                    setPickup(coords);
                    fetchPlaceName(coords, setPickupName); // Fetch place name for pickup
                },
                (error) => {
                    console.warn("Browser geolocation failed, attempting Mapbox fallback", error);
                    fetchMapboxGeolocation(); // Use Mapbox geolocation as a fallback
                },
                { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 } // Additional parameters for higher accuracy
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    // Fallback using Mapbox Geolocation API
    const fetchMapboxGeolocation = () => {
        fetch(`https://api.mapbox.com/geolocate/v1/geolocate?access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.location) {
                    const { lng, lat } = data.location;
                    const coords = [lng, lat];
                    setPickup(coords);
                    fetchPlaceName(coords, setPickupName);
                } else {
                    setError("Mapbox geolocation failed to retrieve location.");
                }
            })
            .catch(() => setError("Failed to retrieve location using Mapbox."));
    };

    // Function to fetch place name for given coordinates
    const fetchPlaceName = (coords, setName) => {
        const [lng, lat] = coords;
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    setName(data.features[0].place_name);
                }
            })
            .catch(() => setError("Failed to retrieve place name."));
    };

    // Fetch live location initially
    useEffect(() => {
        getLiveLocation();
    }, []);

    useEffect(() => {
        if (!mapRef.current || !destination) return;

        const map = mapRef.current.getMap();

        const initializeMap = () => {
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
        };

        map.on('load', initializeMap);

        return () => {
            if (map && directionsRef.current) {
                map.removeControl(directionsRef.current);
                directionsRef.current = null;
            }
        };
    }, [pickup, destination]);

    const handleUseLiveLocation = () => {
        getLiveLocation();
    };

    return (
        <div style={{ paddingTop: '40px' }}> {/* Adjust the padding as per your navbar height */}
            <h1>Navigate to Station</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
