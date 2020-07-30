import React, { Component } from 'react';
import './App.css';

import Navigation from './Components/Navigation';
import Preferencias from './Components/Preferencias';
import Login from './Components/Login'
import 'bootswatch/dist/litera/bootstrap.min.css';
import Mapa from './Components/Mapa';
import request from 'superagent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hospitals: [],
      inRegistro: false,
      hospital: null,
      specialities: [],
      unities: []
    }
  }
  recibirSpe = (respuesta) => {
      if(respuesta){
        this.setState({
          specialities: respuesta
        });
      }
  }
  recibirUti = (respuesta) => {
    if(respuesta){
      this.setState({
        unities: respuesta
      });
    }
  }
  Val = (respuesta) => {

    
    if (respuesta.confirm) {
      fetch("/getUnities", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: respuesta.hos_id})
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => this.recibirUti(response)
        );

      fetch("/getSpecialities", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: respuesta.hos_id })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => this.recibirSpe(response)
        );
  
      this.setState({
        inRegistro: true,
        hospital: respuesta,
      });
    }
  }
  datosInicio = (email, password) => {
    const myObj = {
      "email": email, "password": password
    }
    // console.log(myObj)
    fetch("/confirmLogin", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myObj)
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => this.Val(response));


  }
  componentWillMount() {
    request
      .get('http://localhost:3000/getHospitals')
      .end((err, res) => {
        console.log(JSON.parse(res.text));
        const hospitals = JSON.parse(res.text);
        this.setState({
          hospitals: hospitals
        });
      });
  }
  render() {
    var hospitals = this.state.hospitals;
    return (
      <div className="App container" >

        <Navigation />
        <Login
          datosInicio={this.datosInicio}
          inRegistro={this.state.inRegistro}
          hospital={this.state.hospital}
          specialities={this.state.specialities}
          unities={this.state.unities}
        />

        {/* <Preferencias />
        <button className="btn btn-info mt-2" type="button" data-toggle="collapse" data-target="#panel" aria-expanded="false" aria-controls="panel" id="Buscar">Buscar Recomendación</button>
        <div className="card mx-auto mt-2">
          <Mapa 
          markers = {hospitals}/>
         </div>  */}
      </div>
    );
  }
}

export default App;