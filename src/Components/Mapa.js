import React, {Component} from 'react';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { iconPerson, iconHospital } from "./customMarker";

class Mapa extends Component{
    state = {
        lat: 4.64,
        lng: -74.08083,
        markers: []
    }

    FindMe = () => {
        if (!navigator.geolocation) {
            alert("Lo sentimos, su navegador tiene soporte para geolocalización.\nPrueba a usar el buscador.");
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.setState({
                    lat: latitude,
                    lng: longitude,
                    descripcion: "Mi casa"
                })
                console.log(position);
            },
            (error) => {
                alert("Ha ocurrido un error al obtener la ubicación.\nPrueba a usar el buscador.");

            }
        )
    }

    render(){
        this.FindMe();
          return (
            <div className="App">
                <Map center={[this.state.lat, this.state.lng]} zoom='15' >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker  icon={iconHospital}  position={[this.state.lat, this.state.lng]}>
                    <Popup>
                      Te vigilo bb
                    </Popup>
                  </Marker>
                </Map>
            </div>
          );
      }; 
    };
export default Mapa;