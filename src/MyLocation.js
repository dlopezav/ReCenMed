import React from 'react';

const MyLocation = ({ setCenter, setMarker }) => {
	const FindMe = () => {
		if (!navigator.geolocation) {
			alert("Lo sentimos, su navegador tiene soporte para geolocalización.\nPrueba a usar el buscador.");
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				if (setCenter) {
					setCenter(latitude, longitude);
				}
				if (setMarker) {
					setMarker(latitude, longitude, 'Mi ubicación', `lat: ${latitude}, lng: ${longitude}`);
				}
			},
			(error) => {
				alert("Ha ocurrido un error al obtener la ubicación.\nPrueba a usar el buscador.");
			}
		)
	}
	return(
	<button onClick={FindMe}>
		Encontrar ubicación.
	</button>
	);
}

export default MyLocation;