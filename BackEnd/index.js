// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// API Keys and Credentials
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY; // Now using the API key from .env

// Endpoint to get charging stations from Google Places API
app.get("/api/stations", async (req, res) => {
    const { lat, long } = req.query;

    if (!lat || !long) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    try {
        const googlePlacesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${lat},${long}`,
                radius: 5000,
                type: 'charging_station',
                keyword: 'charging station',
                key: GOOGLE_PLACES_API_KEY,
            }
        });

        if (!googlePlacesResponse.data.results || googlePlacesResponse.data.results.length === 0) {
            return res.status(404).json({ error: "No charging stations found." });
        }

        const stations = await Promise.all(
            googlePlacesResponse.data.results.map(async (station) => {
                const stationData = {
                    name: station.name,
                    address: station.vicinity,
                    rating: station.rating || 'No rating',
                    user_ratings_total: station.user_ratings_total || 'No ratings',
                    latitude: station.geometry.location.lat,
                    longitude: station.geometry.location.lng,
                };

                return stationData;
            })
        );

        res.json({ stations });
    } catch (error) {
        console.error("Error fetching stations:", error.message);
        res.status(500).json({ error: "Error fetching data from Google Places API." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
