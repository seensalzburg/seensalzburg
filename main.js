//Daten für Salzburg 
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


//Thema-Layer Seen 

let themaLayer = {
    Seen: L.featureGroup().addTo(map),
    Badestellen: L.featureGroup().addTo(map),
};


//GEOJSON in Themalayer See reinladen
fetch('WIS_Seen/Seen.geojson')
    .then(response => response.json())
    .then(data => {
        // Füge die GeoJSON-Daten zur Karte hinzu
        L.geoJSON(data,
            {
                onEachFeature: onEachFeature
            }).addTo(themaLayer.Seen);
    })
    .catch(error => console.error('Error loading the GeoJSON data:', error));

//JSON in Themlayer Badestellen reinladen
fetch('WIS_Badestellen.geojson')
    .then(response => response.json())
    .then(data => {
        // Füge die GeoJSON-Daten zur Karte hinzu
        L.geoJSON(data,
            {
                onEachFeature: onEachFeature
            }).addTo(themaLayer.Badestellen);
    })
    .catch(error => console.error('Error loading the GeoJSON data:', error));

// Hintergrundlayer
L.control.layers({
    "BasemapAT Standard": L.tileLayer.provider("BasemapAT.basemap").addTo(map),
    "BasemapAT Gelände": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT Orthofoto beschriftet": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
}, {
    "Seen": themaLayer.Seen,
    "Badestellen": themaLayer.Badestellen
})
    .addTo(map);


//Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);


//Pop-up für Seen

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.NAME) {
        let popupContent =
            `<h2>${feature.properties.NAME}</h2>
            <ul>
                <li> Größe in km2: ${feature.properties.FLAECHEKM2 || 'N/A'}</li>
                <li>Höhe: ${feature.properties.HOEHE || 'unbekannt'}</li>
                <li> Andere Bezeichnung: ${feature.properties.NAMEALIAS || 'N/A'}</li>
                </ul>`;
        layer.bindPopup(popupContent);
    }
}


//Pop-up für Badestellen 

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.NAME) {
        let popupContent =
            `<h2>${feature.properties.NAME}</h2>
            <ul>
                <li> Größe in km2: ${feature.properties.FLAECHEKM2 || 'N/A'}</li>
                <li>Höhe: ${feature.properties.HOEHE || 'unbekannt'}</li>
                <li> Andere Bezeichnung: ${feature.properties.NAMEALIAS || 'N/A'}</li>
                </ul>`;
        layer.bindPopup(popupContent);
    }
}


//Badestellen müssen noch richtig rein geladen werden
//Kommastellen im Pop Up Seen auf 2 Kommas stellen
//User Bild - Icon im Tab
