//Daten für Salzburg 
let salzburg = {
    lat: 47.8095,
    lng: 13.0550,
    title: "Salzburg",
};

// Initialisieren der Karte
let map = L.map("map", {
    fullscreenControl: true
}).setView([salzburg.lat, salzburg.lng], 8);

// Hinzufügen von Kacheln zur Karte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Maßstab
L.control.scale({
    imperial: false
}).addTo(map);

//Thema-Layer Wandern-Route 
let themaLayer = {
    route: L.featureGroup(),
};

// Hintergrundlayer
L.control.layers({
    "BasemapAT Standard": L.tileLayer.provider("BasemapAT.basemap").addTo(map),
    "BasemapAT Gelände": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT Orthofoto beschriftet": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
}, {
    "Wanderroute": themaLayer.route.addTo(map)
})
    .addTo(map);

//Höhenprofil
let controlElevation = L.control.elevation({
    time: false,
    elevationDiv: "#profile",
    height: 350,
    theme: "Wanderroute",
}).addTo(map);
controlElevation.load("data/track.gpx");

// Laden und Anzeigen der GPX-Daten
new L.GPX("data/track.gpx")