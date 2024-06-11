let salzburg = {
    lat: 47.8095,
    lng: 13.0550,
    title: "Salzburg",
};

// Initialisieren der Karte
let map = L.map('map').setView([salzburg.lat, salzburg.lng], 8);

// Hinzufügen von Kacheln zur Karte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.control.scale({
    imperial: false
}).addTo(map);

let themaLayer = {
    Seen: L.featureGroup().addTo(map),
}

//GEOJSON reinladen
fetch('WIS_Seen/Seen.geojson')
    .then(response => response.json())
    .then(data => {
        // Füge die GeoJSON-Daten zur Karte hinzu
        L.geoJSON(data,
            {
                onEachFeature: onEachFeature
            }).addTo(map);
    })
    .catch(error => console.error('Error loading the GeoJSON data:', error));


// Hintergrundlayer
L.control.layers({
    "BasemapAT Grau": L.tileLayer.provider("BasemapAT.grau").addTo(map),
    "BasemapAT Standard": L.tileLayer.provider("BasemapAT.basemap"),
    "BasemapAT High-DPI": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT Gelände": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT Oberfläche": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT Orthofoto beschriftet": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
}, {
    "Seen": themaLayer.Seen,
})
    .addTo(map);

//Pop-up
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.NAME) {
        layer.bindPopup(feature.properties.NAME);
    }
}

