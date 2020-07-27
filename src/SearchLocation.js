import React, { useState } from 'react';

const SearchLocation = ({ setCenter, addMarker, clearMarkers }) => {
	const [query, setQuery] = useState('');
	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		findLocation();
	};

	const findLocation = () => {
		if (!query.length)
			return;
		if (clearMarkers)
			clearMarkers();
		window.L.mapquest.geocoding().geocode(query,
			(error, response) => {
				console.log(response);
				response.results.forEach((result, res_index) => {
					result.locations.forEach(location => {
						const { street, adminArea5, adminArea3, latLng } = location;
						if (res_index === 0) {
							setCenter(latLng.lat, latLng.lng);
						}
						addMarker(
							latLng.lat,
							latLng.lng,
							`lat: ${latLng.lat}, lng: ${latLng.lng}`,
							`${street || ''}, ${adminArea5}, ${adminArea3}`
						);
					})
				});
			}
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='query'>Buscar: </label>
				<input
					type='text'
					id='query'
					defaultValue={query}
					onChange={handleChange}
				/>
			</div>
			<button type='submit' disabled={!query.length}>Buscar!</button>
		</form>
	)

};

export default SearchLocation;