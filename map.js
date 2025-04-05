let cityMap = {
    // West Coast
    "los-angeles": [34.0522, -118.2437],
    "san-diego": [32.7157, -117.1611],
    "san-francisco": [37.7749, -122.4194],
    "santa-rosa": [38.4404, -122.7141],
    "san-jose": [37.3382, -121.8863],
    "seattle": [47.6062, -122.3321],
    "portland": [45.5155, -122.6789],
    "sacramento": [38.5816, -121.4944],
    "oakland": [37.8044, -122.2712],
    "long-beach": [33.7701, -118.1937],
    "anaheim": [33.8366, -117.9143],

    // Central US
    "chicago": [41.8781, -87.6298],
    "detroit": [42.3314, -83.0458],
    "minneapolis": [44.9778, -93.2650],
    "cleveland": [41.4993, -81.6944],
    "omaha": [41.2565, -95.9345],
    "st-louis": [38.6270, -90.1994],
    "indianapolis": [39.7684, -86.1581],
    "columbus": [39.9612, -82.9988],
    "milwaukee": [43.0389, -87.9065],
    "kansas-city": [39.0997, -94.5786],
    "cincinnati": [39.1031, -84.5120],

    // East Coast
    "new-york-city": [40.7128, -74.0060],
    "boston": [42.3601, -71.0589],
    "philadelphia": [39.9526, -75.1652],
    "washington-dc": [38.9072, -77.0369],
    "miami": [25.7617, -80.1918],
    "baltimore": [39.2904, -76.6122],
    "newark": [40.7357, -74.1724],
    "providence": [41.8240, -71.4128],
    "atlanta": [33.7490, -84.3880],
    "tampa": [27.9506, -82.4572]
};

export const cityCoordinates = {
    // West Coast
    'Los Angeles': [34.0522, -118.2437],
    'San Diego': [32.7157, -117.1611],
    'San Francisco': [37.7749, -122.4194],
    'Santa Rosa': [38.4404, -122.7141],
    'San Jose': [37.3382, -121.8863],
    'Seattle': [47.6062, -122.3321],
    'Portland': [45.5155, -122.6789],
    'Sacramento': [38.5816, -121.4944],
    'Oakland': [37.8044, -122.2712],
    'Long Beach': [33.7701, -118.1937],
    'Anaheim': [33.8366, -117.9143],
    
    // Central US
    'Chicago': [41.8781, -87.6298],
    'Detroit': [42.3314, -83.0458],
    'Minneapolis': [44.9778, -93.2650],
    'Cleveland': [41.4993, -81.6944],
    'Omaha': [41.2565, -95.9345],
    'St. Louis': [38.6270, -90.1994],
    'Indianapolis': [39.7684, -86.1581],
    'Columbus': [39.9612, -82.9988],
    'Milwaukee': [43.0389, -87.9065],
    'Kansas City': [39.0997, -94.5786],
    'Cincinnati': [39.1031, -84.5120],
    
    // East Coast
    'New York City': [40.7128, -74.0060],
    'Boston': [42.3601, -71.0589],
    'Philadelphia': [39.9526, -75.1652],
    'Washington, D.C.': [38.9072, -77.0369],
    'Miami': [25.7617, -80.1918],
    'Baltimore': [39.2904, -76.6122],
    'Newark': [40.7357, -74.1724],
    'Providence': [41.8240, -71.4128],
    'Atlanta': [33.7490, -84.3880],
    'Tampa': [27.9506, -82.4572]
};

const regionViews = {
    'West Coast': { center: [37.7749, -122.4194], zoom: 5 },
    'Central US': { center: [41.8781, -87.6298], zoom: 4 },
    'East Coast': { center: [40.7128, -74.0060], zoom: 5 }
};

let map;

export function initializeMap(elementId) {
    map = L.map(elementId).setView([37.7749, -122.4194], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add click handler
    map.on('click', (e) => {
        L.popup()
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    });

    return map;
}

export function updateMapView(map, city = null, region = null) {
    if (city && cityCoordinates[city]) {
        map.setView(cityCoordinates[city], 10);
    } else if (region) {
        const view = regionViews[region] || regionViews['West Coast'];
        map.setView(view.center, view.zoom);
    }
}

/**
 * Generates wildfire expansion by generating an array of polygons
 */
export function generateWildfireData(center, steps = 40, initialSides = 3, maxSides = 20, radiusStep = 0.001) {
    const data = [];
    const [lat, lng] = center;

    for (let t = 0; t < steps; t++) {
        const sides = Math.min(initialSides + t, maxSides); // gradually increase sides
        const radius = (t + 1) * radiusStep;
        const angleOffset = Math.random() * Math.PI * 2;

        const polygon = [];
        for (let i = 0; i < sides; i++) {
            const angle = angleOffset + (i / sides) * 2 * Math.PI;
            const jitter = (Math.random() - 0.5) * radiusStep * 0.5;
            const latOffset = Math.cos(angle) * (radius + jitter);
            const lngOffset = Math.sin(angle) * (radius + jitter);
            polygon.push([lat + latOffset, lng + lngOffset]);
        }

        data.push(polygon);
    }

    return data;
}
