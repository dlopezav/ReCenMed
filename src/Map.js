import React, { useEffect } from 'react';

const Map = ({ height, width, center, tileLayer, zoom, apiKey }) => {
	useEffect(() => {
		window.L.mapquest.key = apiKey;
		const map = window.L.mapquest.map('map', {
			center,
			layers: window.L.mapquest.tileLayer(tileLayer),
			zoom
		});
		map.addControl(window.L.mapquest.control());
	}, []);

	return (
		<div id="map" style={{width, height}}>
			<h1>Se está cargando el mapa, por favor espere.</h1>
		</div>
	)
}

export default Map;