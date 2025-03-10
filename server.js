// server.js - A mock RESTful API using Express.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;  // Updated for Render deployment

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database mock - Gujarat Vidyapith locations
const locations = [
  {
    "id": 1,
    "name": "Gujarat Vidyapith (Main Campus)",
    "address": "Ashram Rd, Near Income Tax Office, Ahmedabad, Gujarat 380014, India",
    "type": "University",
    "coordinates": {
      "latitude": 23.0507,
      "longitude": 72.5644
    }
  },
  {
    "id": 2,
    "name": "Mahadev Desai College of Social Service",
    "address": "Gujarat Vidyapith, Ashram Rd, Ahmedabad, Gujarat 380014, India",
    "type": "College",
    "coordinates": {
      "latitude": 23.0509,
      "longitude": 72.5642
    }
  },
  {
    "id": 3,
    "name": "Gram Sevak Mahavidyalaya",
    "address": "Gujarat Vidyapith, Sadra, Gujarat 383220, India",
    "type": "College",
    "coordinates": {
      "latitude": 23.1895,
      "longitude": 72.6476
    }
  },
  {
    "id": 4,
    "name": "Shikshan Mahavidyalaya",
    "address": "Gujarat Vidyapith, Ashram Rd, Ahmedabad, Gujarat 380014, India",
    "type": "College",
    "coordinates": {
      "latitude": 23.0510,
      "longitude": 72.5647
    }
  },
  {
    "id": 5,
    "name": "Bhasha Sahitya Bhavan",
    "address": "Gujarat Vidyapith, Ashram Rd, Ahmedabad, Gujarat 380014, India",
    "type": "Department",
    "coordinates": {
      "latitude": 23.0506,
      "longitude": 72.5641
    }
  },
  {
    "id": 6,
    "name": "Samaj Vidya Bhavan",
    "address": "Gujarat Vidyapith, Ashram Rd, Ahmedabad, Gujarat 380014, India",
    "type": "Department",
    "coordinates": {
      "latitude": 23.0508,
      "longitude": 72.5640
    }
  },
  {
    "id": 7,
    "name": "Arthashastra Bhavan",
    "address": "Gujarat Vidyapith, Ashram Rd, Ahmedabad, Gujarat 380014, India",
    "type": "Department",
    "coordinates": {
      "latitude": 23.0511,
      "longitude": 72.5643
    }
  },
  {
    "id": 8,
    "name": "Granthalaya ane Mahiti Vigyan Bhavan",
    "address": "Gujarat Vidyapith, Ashram Rd, Ahmedabad, Gujarat 380014, India",
    "type": "Department",
    "coordinates": {
      "latitude": 23.0505,
      "longitude": 72.5645
    }
  },
  {
    "id": 9,
    "name": "Jivanshala",
    "address": "Gujarat Vidyapith, Ashram Rd, Ahmedabad, Gujarat 380014, India",
    "type": "School",
    "coordinates": {
      "latitude": 23.0503,
      "longitude": 72.5641
    }
  },
  {
    "id": 10,
    "name": "Gujarat Vidyapith Museum",
    "address": "Gujarat Vidyapith, Ashram Rd, Ahmedabad, Gujarat 380014, India",
    "type": "Museum",
    "coordinates": {
      "latitude": 23.0504,
      "longitude": 72.5643
    }
  },
  {
    "id": 11,
    "name": "Gujarat Vidyapith Publication Division",
    "address": "Gujarat Vidyapith, Ashram Rd, Ahmedabad, Gujarat 380014, India",
    "type": "Publication",
    "coordinates": {
      "latitude": 23.0512,
      "longitude": 72.5646
    }
  },
  {
    "id": 12,
    "name": "Gujarat Vidyapith Khadi Gramodyog Bhavan",
    "address": "Gujarat Vidyapith, Ashram Rd, Ahmedabad, Gujarat 380014, India",
    "type": "Khadi outlet",
    "coordinates": {
      "latitude": 23.0513,
      "longitude": 72.5642
    }
  },
  {
    "id": 13,
    "name": "Gujarat Vidyapith Sadra Campus",
    "address": "Sadra, Gujarat 383220, India",
    "type": "Campus",
    "coordinates": {
      "latitude": 23.1895,
      "longitude": 72.6476
    }
  },
  {
    "id": 14,
    "name": "Gujarat Vidyapith Randheja Campus",
    "address": "Randheja, Gujarat, India",
    "type": "Campus",
    "coordinates": {
      "latitude": 23.1351,
      "longitude": 72.6807
    }
  },
  {
    "id": 15,
    "name": "Gujarat Vidyapith Ambheti Campus",
    "address": "Ambheti, Gujarat, India",
    "type": "Campus",
    "coordinates": {
      "latitude": 20.3866,
      "longitude": 72.9369
    }
  }
];

// Mock safety data for the Ahmedabad region
const safetyZones = {
  "ashram_road": {
    "day": {
      "safetyScore": 92,
      "safety": "Safe",
      "lighting": "Daylight",
      "visibility": "Good",
      "recentCrimes": []
    },
    "night": {
      "safetyScore": 78,
      "safety": "Safe",
      "lighting": "Well lit",
      "visibility": "Good",
      "recentCrimes": [
        { "type": "Minor Theft", "date": "3 weeks ago", "time": "11:45 PM" }
      ]
    }
  },
  "sadra": {
    "day": {
      "safetyScore": 95,
      "safety": "Safe",
      "lighting": "Daylight",
      "visibility": "Good",
      "recentCrimes": []
    },
    "night": {
      "safetyScore": 72,
      "safety": "Caution advised",
      "lighting": "Partially lit",
      "visibility": "Limited",
      "recentCrimes": [
        { "type": "Trespassing", "date": "2 months ago", "time": "10:20 PM" }
      ]
    }
  },
  "randheja": {
    "day": {
      "safetyScore": 90,
      "safety": "Safe",
      "lighting": "Daylight",
      "visibility": "Good",
      "recentCrimes": []
    },
    "night": {
      "safetyScore": 65,
      "safety": "Caution advised",
      "lighting": "Poorly lit",
      "visibility": "Limited",
      "recentCrimes": [
        { "type": "Vandalism", "date": "1 month ago", "time": "1:30 AM" }
      ]
    }
  },
  "ambheti": {
    "day": {
      "safetyScore": 88,
      "safety": "Safe",
      "lighting": "Daylight",
      "visibility": "Good",
      "recentCrimes": []
    },
    "night": {
      "safetyScore": 60,
      "safety": "Caution advised",
      "lighting": "Poorly lit",
      "visibility": "Limited",
      "recentCrimes": [
        { "type": "Theft", "date": "2 months ago", "time": "12:15 AM" },
        { "type": "Trespassing", "date": "3 months ago", "time": "11:30 PM" }
      ]
    }
  }
};

// Mock nearby important facilities
const nearbyFacilities = {
  "ashram_road": [
    {
      "name": "Police Station - Navrangpura",
      "type": "police",
      "distance": "0.8 km",
      "coordinates": { "latitude": 23.0448, "longitude": 72.5683 }
    },
    {
      "name": "Civil Hospital",
      "type": "hospital",
      "distance": "1.2 km",
      "coordinates": { "latitude": 23.0528, "longitude": 72.6045 }
    },
    {
      "name": "BRTS Bus Station",
      "type": "transport",
      "distance": "0.3 km",
      "coordinates": { "latitude": 23.0510, "longitude": 72.5620 }
    }
  ],
  "sadra": [
    {
      "name": "Gandhinagar Police Station",
      "type": "police",
      "distance": "5.3 km",
      "coordinates": { "latitude": 23.2156, "longitude": 72.6369 }
    },
    {
      "name": "Civil Hospital Gandhinagar",
      "type": "hospital",
      "distance": "7.1 km",
      "coordinates": { "latitude": 23.2229, "longitude": 72.6614 }
    }
  ],
  "randheja": [
    {
      "name": "Kalol Police Station",
      "type": "police",
      "distance": "4.7 km",
      "coordinates": { "latitude": 23.1619, "longitude": 72.6643 }
    },
    {
      "name": "Community Health Center",
      "type": "hospital",
      "distance": "3.2 km",
      "coordinates": { "latitude": 23.1421, "longitude": 72.6754 }
    }
  ],
  "ambheti": [
    {
      "name": "Valsad Police Station",
      "type": "police",
      "distance": "8.5 km",
      "coordinates": { "latitude": 20.4067, "longitude": 72.9302 }
    },
    {
      "name": "Rural Hospital",
      "type": "hospital",
      "distance": "5.9 km",
      "coordinates": { "latitude": 20.3926, "longitude": 72.9410 }
    }
  ]
};

// Helper function to determine which zone a set of coordinates is in
function getZoneFromCoordinates(lat, lng) {
  if (Math.abs(lat - 23.05) < 0.05 && Math.abs(lng - 72.56) < 0.05) {
    return "ashram_road";
  } else if (Math.abs(lat - 23.19) < 0.05 && Math.abs(lng - 72.65) < 0.05) {
    return "sadra";
  } else if (Math.abs(lat - 23.13) < 0.05 && Math.abs(lng - 72.68) < 0.05) {
    return "randheja";
  } else if (Math.abs(lat - 20.39) < 0.05 && Math.abs(lng - 72.94) < 0.05) {
    return "ambheti";
  }
  return "ashram_road";
}

// Helper function to compute a color based on the safety score
function getSafetyColor(score) {
  if (score >= 90) return "green";
  else if (score >= 80) return "yellow";
  else return "red";
}

// Helper function to assign icons for each safety metric
function getSafetyIcons(safety, lighting, visibility) {
  let safetyIcon = safety === "Safe" ? "check-circle" : "exclamation-triangle";
  let lightingIcon;
  if (lighting.toLowerCase() === "daylight") lightingIcon = "sun";
  else if (lighting.toLowerCase() === "well lit") lightingIcon = "lightbulb";
  else lightingIcon = "moon"; // for "Poorly lit" or similar
  let visibilityIcon = visibility === "Good" ? "eye" : "eye-slash";
  return { safetyIcon, lightingIcon, visibilityIcon };
}

// New helper function: Generate safety recommendations based on data
function getSafetyRecommendations(safetyData) {
  let recommendations = [];
  if (safetyData.safetyScore < 80) {
    recommendations.push("Avoid isolated areas during night time.");
    recommendations.push("Consider traveling in groups.");
    recommendations.push("Review local news for any recent alerts.");
  } else {
    recommendations.push("Area is generally safe. Stay alert and follow common safety practices.");
  }
  if (safetyData.lighting.toLowerCase() !== "daylight") {
    recommendations.push("Extra caution is recommended due to suboptimal lighting.");
  }
  if (safetyData.visibility.toLowerCase() !== "good") {
    recommendations.push("Poor visibility may increase risk. Consider alternate routes or travel during daytime.");
  }
  return recommendations;
}

// New helper function: Return emergency contact details
function getEmergencyContacts(zone) {
  // For demonstration, we return a common list. You might customize per zone.
  return [
    { type: "Police", phone: "100" },
    { type: "Ambulance", phone: "102" },
    { type: "Fire Service", phone: "101" }
  ];
}

// New helper function: Return historical incident data (mocked)
function getHistoricalData(zone, timeOfDay) {
  // Return random data for demonstration purposes.
  if (timeOfDay === "night") {
    return { monthlyIncidents: Math.floor(Math.random() * 5) + 1, yearlyIncidents: Math.floor(Math.random() * 20) + 5 };
  }
  return { monthlyIncidents: Math.floor(Math.random() * 2), yearlyIncidents: Math.floor(Math.random() * 10) };
}

// GET all locations
app.get('/api/locations', (req, res) => {
  res.json({
    success: true,
    count: locations.length,
    data: locations
  });
});

// GET location by ID
app.get('/api/locations/:id', (req, res) => {
  const location = locations.find(loc => loc.id === parseInt(req.params.id));
  if (!location) {
    return res.status(404).json({ success: false, message: 'Location not found' });
  }
  res.json({ success: true, data: location });
});

// GET locations by type
app.get('/api/locations/type/:type', (req, res) => {
  const filteredLocations = locations.filter(loc => loc.type.toLowerCase() === req.params.type.toLowerCase());
  res.json({ success: true, count: filteredLocations.length, data: filteredLocations });
});

// GET safety data for a route between two points
// Added Safety Features:
// - Safety Assessment Modal details (safety score, status, lighting, visibility, recent crimes)
// - Visual Indicators: color-coded safety score and icons
// - Additional Data: safety recommendations, emergency contacts, historical incident data, metadata
app.get('/api/safety', (req, res) => {
  const { startLat, startLng, endLat, endLng, time } = req.query;
  
  if (!startLat || !startLng || !endLat || !endLng) {
    return res.status(400).json({ success: false, message: 'Missing coordinates parameters' });
  }
  
  // Determine zone using the midpoint of the route
  const midLat = (parseFloat(startLat) + parseFloat(endLat)) / 2;
  const midLng = (parseFloat(startLng) + parseFloat(endLng)) / 2;
  const zone = getZoneFromCoordinates(midLat, midLng);
  
  // Determine if it's day or night based on provided time or current time
  const currentTime = time ? parseInt(time) : new Date().getHours();
  const timeOfDay = (currentTime >= 6 && currentTime < 19) ? 'day' : 'night';
  
  // Get safety data for the zone and time of day
  const safetyData = safetyZones[zone][timeOfDay];
  
  // Compute additional visual indicators
  const computedSafetyColor = getSafetyColor(safetyData.safetyScore);
  const icons = getSafetyIcons(safetyData.safety, safetyData.lighting, safetyData.visibility);
  
  // Get additional safety details
  const recommendations = getSafetyRecommendations(safetyData);
  const emergencyContacts = getEmergencyContacts(zone);
  const historicalData = getHistoricalData(zone, timeOfDay);
  
  res.json({
    success: true,
    data: {
      zone: zone,
      timeOfDay: timeOfDay,
      route: {
        start: { latitude: parseFloat(startLat), longitude: parseFloat(startLng) },
        end: { latitude: parseFloat(endLat), longitude: parseFloat(endLng) },
        distance: `${((Math.abs(parseFloat(startLat) - parseFloat(endLat)) +
                      Math.abs(parseFloat(startLng) - parseFloat(endLng))) * 111).toFixed(1)} km`,
        estimatedTime: `${Math.floor(((Math.abs(parseFloat(startLat) - parseFloat(endLat)) +
                        Math.abs(parseFloat(startLng) - parseFloat(endLng))) * 111) / 0.05)} minutes`
      },
      // Safety Assessment Modal Data
      safetyScore: safetyData.safetyScore,
      safety: safetyData.safety,
      lighting: safetyData.lighting,
      visibility: safetyData.visibility,
      recentCrimes: safetyData.recentCrimes,
      // Visual Indicators
      safetyColor: computedSafetyColor,
      icons: icons,
      // Additional Safety Data
      recommendations: recommendations,
      emergencyContacts: emergencyContacts,
      historicalData: historicalData,
      lastUpdated: new Date().toISOString(),
      dataSource: "Mock Data"
    }
  });
});

// GET nearby facilities for a location
app.get('/api/nearby-facilities', (req, res) => {
  const { lat, lng, type } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({ success: false, message: 'Missing coordinates parameters' });
  }
  
  const zone = getZoneFromCoordinates(parseFloat(lat), parseFloat(lng));
  let facilities = nearbyFacilities[zone];
  
  if (type) {
    facilities = facilities.filter(facility => facility.type === type);
  }
  
  res.json({ success: true, count: facilities.length, data: facilities });
});

// POST a new location (mock create endpoint)
app.post('/api/locations', (req, res) => {
  const { name, address, type, latitude, longitude } = req.body;
  
  if (!name || !address || !type || !latitude || !longitude) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }
  
  const newLocation = {
    id: locations.length + 1,
    name,
    address,
    type,
    coordinates: { latitude, longitude }
  };
  
  locations.push(newLocation);
  
  res.status(201).json({ success: true, data: newLocation });
});

// PUT update a location
app.put('/api/locations/:id', (req, res) => {
  const { name, address, type, latitude, longitude } = req.body;
  const id = parseInt(req.params.id);
  
  const locationIndex = locations.findIndex(loc => loc.id === id);
  if (locationIndex === -1) {
    return res.status(404).json({ success: false, message: 'Location not found' });
  }
  
  const updatedLocation = {
    id,
    name: name || locations[locationIndex].name,
    address: address || locations[locationIndex].address,
    type: type || locations[locationIndex].type,
    coordinates: {
      latitude: latitude || locations[locationIndex].coordinates.latitude,
      longitude: longitude || locations[locationIndex].coordinates.longitude
    }
  };
  
  locations[locationIndex] = updatedLocation;
  res.json({ success: true, data: updatedLocation });
});

// DELETE a location
app.delete('/api/locations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const locationIndex = locations.findIndex(loc => loc.id === id);
  if (locationIndex === -1) {
    return res.status(404).json({ success: false, message: 'Location not found' });
  }
  
  const deletedLocation = locations.splice(locationIndex, 1);
  res.json({ success: true, data: deletedLocation[0] });
});

// Start the server
app.listen(port, () => {
  console.log(`Mock Gujarat Vidyapith API running on port ${port}`);
});

module.exports = app; // For testing purposes
