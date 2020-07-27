import React, {Component} from 'react';
import './App.css';
import Map from './Map.js'
import MyLocation from './MyLocation.js';
import SearchLocation from './SearchLocation.js';

class App extends Component{
  state = {
    lat: '4.5988',
    lng: '-74.08083',
    markers: []
  }

  setCenter = (lat, lng) => {
    this.setState({lat, lng});
    window.L.mapquest.Map.getMap('map').setView(new window.L.LatLng(lat, lng), 15);
  }

  addMarker = (lat, lng, title, subtitle) =>{
    const Marker = window.L.mapquest.textMarker(new window.L.LatLng(lat, lng), {
      text: title || ' ',
      subtext: subtitle || ' ',
      position: 'right',
      type: 'marker',
      icon: window.L.mapquest.icons.circle({primaryColor: '#0000FF', secundaryColor: 'ff0000', size: 'md'})
    }).addTo(window.L.mapquest.Map.getMap('map'));
    var markers = this.state.markers;
    markers.push(Marker);
    this.setState({markers});
  }

  clearMarkers = () => {
    var markers = this.state.markers;
    markers.forEach(marker =>{
      window.L.mapquest.Map.getMap('map').removeLayer(marker);
    })
    this.setState({
      markers: []
    });
  };

  render(){
    return (
      <div className="App">
        <SearchLocation
          setCenter = {this.setCenter}
          addMarker = {this.addMarker}
          clearMarkers = {this.clearMarkers}
        />
        <MyLocation
          setCenter= {this.setCenter}
          setMarker= {this.addMarker}
        /> 
        <Map
          height = "1000px"
          width = "100%"
          center = {[this.state.lat, this.state.lng]}
          tileLayer = {'map'}
          zoom = {10.5}
          apiKey = 'dD11pZgVYpDKF0I00EOjFfGFKvHW6VnF'
        />
      </div>
    );
  }; 
};

export default App;