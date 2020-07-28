import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('./img/marker-icon.png'),
    iconRetinaUrl: require('./img/marker-icon.png'),
    iconSize: [25,41],
    iconAnchor:[12.5,41],
    popupAnchor: [0, -41]
});

const iconHospital = new L.Icon({
    iconUrl: require('./img/hostpital-marker.png'),
    iconRetinaUrl: require('./img/hostpital-marker.png'),
    iconSize: [31,41],
    iconAnchor:[15,41],
    popupAnchor: [0, -41]
})

export { iconPerson, iconHospital };