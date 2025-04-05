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







// TESTING LIVE UPDATE
// Just a proof of concept
/*
const polygonData = [
    [ [37.770817, -122.456907], [37.76834, -122.45916], [37.768917, -122.455148] ], // t=0
    [ [37.771597, -122.457025], [37.767679, -122.459825], [37.768391, -122.454257] ],
    [ [37.77465, -122.454901], [37.774311, -122.458034], [37.766983, -122.461896], [37.767221, -122.453957] ],
    [ [37.7762, -122.4532], [37.7755, -122.4598], [37.7654, -122.4625], [37.7657, -122.4523] ],
    [ [37.778, -122.452], [37.776, -122.4602], [37.763, -122.4639], [37.7642, -122.451] ],
    [ [37.78, -122.451], [37.7765, -122.4612], [37.7615, -122.4655], [37.7626, -122.4501] ],
    [ [37.782, -122.4501], [37.777, -122.4622], [37.76, -122.467], [37.761, -122.4493] ],
    [ [37.784, -122.4492], [37.7775, -122.4632], [37.7585, -122.4685], [37.7594, -122.4485] ],
    [ [37.786, -122.4483], [37.778, -122.4642], [37.757, -122.47], [37.7578, -122.4477] ],
    [ [37.788, -122.4474], [37.7785, -122.4652], [37.7555, -122.4715], [37.7562, -122.4469] ],
    [ [37.79, -122.4465], [37.779, -122.4662], [37.754, -122.473], [37.7546, -122.4461] ],
    [ [37.792, -122.4456], [37.7795, -122.4672], [37.7525, -122.4745], [37.753, -122.4453] ],
    [ [37.794, -122.4447], [37.78, -122.4682], [37.751, -122.476], [37.7514, -122.4445] ],
    [ [37.796, -122.4438], [37.7805, -122.4692], [37.7495, -122.4775], [37.7498, -122.4437] ],
    [ [37.798, -122.4429], [37.781, -122.4702], [37.748, -122.479], [37.7482, -122.4429] ],
    [ [37.8, -122.442], [37.7815, -122.4712], [37.7465, -122.4805], [37.7466, -122.4421] ],
    [ [37.802, -122.4411], [37.782, -122.4722], [37.745, -122.482], [37.745, -122.4413] ],
    [ [37.804, -122.4402], [37.7825, -122.4732], [37.7435, -122.4835], [37.7434, -122.4405] ],
    [ [37.806, -122.4393], [37.783, -122.4742], [37.742, -122.485], [37.7418, -122.4397] ],
    [ [37.808, -122.4384], [37.7835, -122.4752], [37.7405, -122.4865], [37.7402, -122.4389] ],
    [ [37.81, -122.4375], [37.784, -122.4762], [37.739, -122.488], [37.7386, -122.4381] ],
    [ [37.812, -122.4366], [37.7845, -122.4772], [37.7375, -122.4895], [37.737, -122.4373] ],
    [ [37.814, -122.4357], [37.785, -122.4782], [37.736, -122.491], [37.7354, -122.4365] ],
    [ [37.816, -122.4348], [37.7855, -122.4792], [37.7345, -122.4925], [37.7338, -122.4357] ],
    [ [37.818, -122.4339], [37.786, -122.4802], [37.733, -122.494], [37.7322, -122.4349] ],
    [ [37.82, -122.433], [37.7865, -122.4812], [37.7315, -122.4955], [37.7306, -122.4341] ],
    [ [37.822, -122.4321], [37.787, -122.4822], [37.73, -122.497], [37.729, -122.4333] ],
    [ [37.824, -122.4312], [37.7875, -122.4832], [37.7285, -122.4985], [37.7274, -122.4325] ],
    [ [37.826, -122.4303], [37.788, -122.4842], [37.727, -122.5], [37.7258, -122.4317] ],
    [ [37.828, -122.4294], [37.7885, -122.4852], [37.7255, -122.5015], [37.7242, -122.4309] ],
    [ [37.83, -122.4285], [37.789, -122.4862], [37.724, -122.503], [37.7226, -122.4301] ],
    [ [37.832, -122.4276], [37.7895, -122.4872], [37.7225, -122.5045], [37.721, -122.4293] ],
    [ [37.834, -122.4267], [37.79, -122.4882], [37.721, -122.506], [37.7194, -122.4285] ],
    [ [37.836, -122.4258], [37.7905, -122.4892], [37.7195, -122.5075], [37.7178, -122.4277] ],
    [ [37.838, -122.4249], [37.791, -122.4902], [37.718, -122.509], [37.7162, -122.4269] ],
    [ [37.84, -122.424], [37.7915, -122.4912], [37.7165, -122.5105], [37.7146, -122.4261] ],
    [ [37.842, -122.4231], [37.792, -122.4922], [37.715, -122.512], [37.713, -122.4253] ],
    [ [37.844, -122.4222], [37.7925, -122.4932], [37.7135, -122.5135], [37.7114, -122.4245] ],
    [ [37.846, -122.4213], [37.793, -122.4942], [37.712, -122.515], [37.7098, -122.4237] ],
    [ [37.848, -122.4204], [37.7935, -122.4952], [37.7105, -122.5165], [37.7082, -122.4229] ]
  ];
  */
  
    /**
    * Simulates wildfire expansion by generating an array of polygons
    * that grow outward and increase in complexity (more sides) over time.
    *
    * @param {number[]} center - [latitude, longitude] of the wildfire origin.
    * @param {number} steps - Number of time steps (polygons) to generate. Default: 40.
    * @param {number} initialSides - Number of sides in the first polygon. Default: 3.
    * @param {number} maxSides - Maximum number of sides allowed. Default: 20.
    * @param {number} radiusStep - How much the fire expands each step (in degrees). Default: 0.001.
    * @returns {Array<Array<[number, number]>>} - Array of polygons (each a list of [lat, lng] pairs).
    */
    function generateWildfireData(center, steps = 40, initialSides = 3, maxSides = 20, radiusStep = 0.001) {
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

  const center = [37.770817, -122.456907]; // SF start point
const polygonData = generateWildfireData(center);

/**
 * Sets the vertices of the polygon given an array of coordinates for latitude and longitude
 *
 * @param {coords} - Array of vertices for polygon
 */
function updatePolygon(coords) {
    polygon.setLatLngs(coords);
  }

let currentIndex = 0;
const interval = setInterval(() => {
  updatePolygon(polygonData[currentIndex]);
  currentIndex++;
  console.log("Testing live update");
  if (currentIndex >= polygonData.length) clearInterval(interval);
}, 2000); // update every second
