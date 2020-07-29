import L from 'leaflet';
const pointerIcon = new L.Icon({
    iconUrl: './img/hostpital-marker.png',
    iconRetinaUrl: './img/hostpital-marker.png',
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowUrl: './img/marker-icon.png',
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  })

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

export { iconPerson, iconHospital, pointerIcon };