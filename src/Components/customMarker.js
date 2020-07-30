import L from 'leaflet';

const pointerIcon = new L.Icon({
    iconUrl: 'Markers/blueMarker.png',
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 60],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92]
  })

const iconPerson = new L.Icon({
    iconUrl: 'Markers/redMarker.png',
    iconSize: [31,48],
    iconAnchor:[15,41],
    popupAnchor: [0, -41]
});

const iconHospital = new L.Icon({
    iconUrl: 'Markers/blueMarker.png',
    iconSize: [31,48],
    iconAnchor:[15,41],
    popupAnchor: [0, -41]
})

export { iconPerson, iconHospital, pointerIcon };