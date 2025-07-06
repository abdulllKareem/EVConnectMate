require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Your Open Charge Map API Key from environment variables
const OCM_API_KEY = process.env.OCM_API_KEY;

app.get("/api/stations", async (req, res) => {
    const { lat, long } = req.query;

    if (!lat || !long) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    try {
        const ocmResponse = await axios.get('https://api.openchargemap.io/v3/poi/', {
            params: {
                output: 'json',
                latitude: lat,
                longitude: long,
                maxresults: 10,
                compact: true,
                verbose: false,
                key: OCM_API_KEY
            }
        });

        if (!ocmResponse.data || ocmResponse.data.length === 0) {
            return res.status(404).json({ error: "No charging stations found." });
        }

        const stations = ocmResponse.data.map(station => ({
            name: station.AddressInfo?.Title || 'Unknown',
            address: `${station.AddressInfo?.AddressLine1 || ''}, ${station.AddressInfo?.AddressLine2 || ''}, ${station.AddressInfo?.Town || ''}`,
            latitude: station.AddressInfo?.Latitude,
            longitude: station.AddressInfo?.Longitude,
            usageCost: station.UsageCost || 'N/A',
            powerKW: station.Connections?.[0]?.PowerKW || 'N/A'
        }));

        res.json({ stations });
    } catch (error) {
        console.error("Error fetching stations:", error.message);
        res.status(500).json({ error: "Failed to fetch data from Open Charge Map API." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
