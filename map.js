let cityMap = {
    // North America
    "new-york": [40.7128, -74.0060],
    "los-angeles": [34.0522, -118.2437],
    "toronto": [43.651070, -79.347015],
    "mexico-city": [19.4326, -99.1332],
    "chicago": [41.8781, -87.6298],
    "san-francisco": [37.7749, -122.4194],
    "vancouver": [49.2827, -123.1207],
    "montreal": [45.5017, -73.5673],
    "miami": [25.7617, -80.1918],
    "seattle": [47.6062, -122.3321],
  
    // South America
    "são-paulo": [-23.5505, -46.6333],
    "buenos-aires": [-34.6037, -58.3816],
    "lima": [-12.0464, -77.0428],
    "bogotá": [4.7110, -74.0721],
    "rio-de-janeiro": [-22.9068, -43.1729],
    "santiago": [-33.4489, -70.6693],
    "caracas": [10.4806, -66.9036],
    "medellín": [6.2442, -75.5812],
    "quito": [-0.1807, -78.4678],
    "montevideo": [-34.9011, -56.1645],
  
    // Europe
    "london": [51.5072, -0.1276],
    "paris": [48.8566, 2.3522],
    "berlin": [52.5200, 13.4050],
    "rome": [41.9028, 12.4964],
    "madrid": [40.4168, -3.7038],
    "amsterdam": [52.3676, 4.9041],
    "brussels": [50.8503, 4.3517],
    "vienna": [48.2082, 16.3738],
    "stockholm": [59.3293, 18.0686],
    "copenhagen": [55.6761, 12.5683],
  
    // Asia
    "tokyo": [35.6762, 139.6503],
    "shanghai": [31.2304, 121.4737],
    "seoul": [37.5665, 126.9780],
    "mumbai": [19.0760, 72.8777],
    "beijing": [39.9042, 116.4074],
    "singapore": [1.3521, 103.8198],
    "bangkok": [13.7563, 100.5018],
    "dubai": [25.2048, 55.2708],
    "hong-kong": [22.3193, 114.1694],
    "jakarta": [-6.2088, 106.8456],
  
    // Africa
    "cairo": [30.0444, 31.2357],
    "lagos": [6.5244, 3.3792],
    "johannesburg": [-26.2041, 28.0473],
    "nairobi": [-1.2921, 36.8219],
    "casablanca": [33.5731, -7.5898],
    "cape-town": [-33.9249, 18.4241],
    "accra": [5.6037, -0.1870],
    "dakar": [14.7167, -17.4677],
    "addis-ababa": [9.0300, 38.7400],
    "dar-es-salaam": [-6.7924, 39.2083],
  
    // Oceania
    "sydney": [-33.8688, 151.2093],
    "melbourne": [-37.8136, 144.9631],
    "auckland": [-36.8485, 174.7633],
    "brisbane": [-27.4698, 153.0251],
    "perth": [-31.9505, 115.8605],
    "wellington": [-41.2865, 174.7762],
    "adelaide": [-34.9285, 138.6007],
    "gold-coast": [-28.0167, 153.4000],
    "christchurch": [-43.5321, 172.6362],
    "hobart": [-42.8821, 147.3272]
};

// Get the city name from local storage
var cityName = localStorage.getItem('cityName');
console.log("CityName: ", cityName);

// create map
var map = L.map('map').setView([37.768679, -122.447348], 13); // make it like setView(cityMap[cityname], zoom)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// marker demo
var marker = L.marker([37.768679, -122.447348]).addTo(map);
// popup demo
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

//polygon demo
var polygon = L.polygon([
    [37.770817, -122.456907],
    [37.76834, -122.45916],
    [37.768917, -122.455148],

]).addTo(map);
polygon.setStyle({color: 'red'});

// interaction with popup demo
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);