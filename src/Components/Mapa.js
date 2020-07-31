import React, {Component} from 'react';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { iconPerson, iconHospital, pointerIcon } from "./customMarker";



class Mapa extends Component{
  constructor(props){
    super(props);
    this.state = {
      lat: 4.629572,
      lng: -74.135643
    }
    this.FindMe();
  }
  mostrarMarkers = () => {
    const markers = this.props.markers;
    if(markers.length === 0) return null;
    
    return (
        <React.Fragment>
                {markers.map(marker => (
                    <Marker
                    key={marker.hos_id}
                    position ={[marker.hos_lat,marker.hos_lng]}
                    icon = {iconHospital}
                    >
                      <Popup>
                        {marker.hos_name +'\n Dirección: '+ marker.hos_address}
                      </Popup>
                    </Marker> 
                ))}
        </React.Fragment>
    )
  }
  FindMe = () => {
      if (!navigator.geolocation) {
          alert("Lo sentimos, su navegador tiene soporte para geolocalización.\nPrueba a usar el buscador.");
      }
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const { latitude, longitude } = position.coords;
              if(latitude){
                this.props.getLocation(latitude, longitude)
              }else{
                this.props.getLocation(this.state.lat, this.state.lng)
              }
              this.setState({
                lat: latitude,
                lng: longitude,
                descripcion: "Mi casa"
              })
              
              console.log(position);
              console.log(this.state.lat, this.state.lng)
          },
          (error) => {
              alert("Ha ocurrido un error al obtener la ubicación.\nPrueba a usar el buscador.");

          }
      )
      
  }

  render(){
        return (
          <div className="App">
              <Map center={[this.state.lat, this.state.lng]} zoom='15'>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.mostrarMarkers()}
                  
                <Marker
                  position ={[this.state.lat, this.state.lng]}
                  icon = {iconPerson}
                  key = "casa"
                  >
                    <Popup>
                      {this.state.descripcion}
                    </Popup>
                </Marker>
              </Map>
          </div>
        );
  }; 
};
export default Mapa;