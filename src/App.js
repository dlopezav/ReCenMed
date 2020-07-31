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
      unities: [],
      latitud: null,
      longitud: null,
      inLogin: false,
    }
  }


  getLocation = (lat, long) => {
    this.setState({
      latitud:  lat,
      longitud:  long,
    })
  }
  recibirSpe = (respuesta) => {
      if(respuesta){
        console.log(respuesta);
        this.setState({
          specialities: respuesta
        });
      }
  }
  recibirUti = (respuesta) => {
    if(respuesta){
      console.log(respuesta);
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
    }else{
      alert("Hay un error!");
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

  datosRegistro = (name, email, password, address) => {
    const myObj = {
      "name": name,
      "email": email,
      "password": password,
      "address": address,
      "lat": this.state.latitud,
      "lng": this.state.longitud,
    }
    // console.log(myObj)
    fetch("/confirmRegister", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myObj)
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if(response){
          alert("Registro Correcto")
          this.setState(
            {
              inLogin: false
            }
          )
        }
        else{
          alert("Error al registrar")
        }
      });
  }

  changeToLogin = () => {
    if(this.state.inLogin){
      this.setState({
        inLogin: false,
        inRegistro: false
      })
    }
    else{
      this.setState({
        inLogin: true
      })
    }
  }

  datosActualizar = (spc, uni, spc_doctor, uni_total, uni_assigned, spe) => {
    
    const myObj = {
      "uni_total": uni_total,
      "uni_assigned": uni_assigned,
      "hos_id": this.state.hospital.hos_id,
      "unidad": uni,
      "doctores": spc_doctor,
      "hos_id2": this.state.hospital.hos_id,
      "especialidad": spc,
      "spe": spe
    }
    // console.log()
    console.log(myObj)
    fetch("/actualizarDatos", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myObj)
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if(response){
          alert("Actualización completa")
          const {hospital} = this.state
          hospital.confirm = true
          this.Val(hospital)
        }
        else{
          alert("Error al actualizar")
        }
      });
  }

  componentWillMount() {
    request
      .get('localhost:3000/getHospitals')
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
    if(this.state.inLogin){
      return(
        <div className="App container">
          <Navigation 
            changeToLogin={this.changeToLogin}
            inLogin = {this.state.inLogin}
          />
          <Login
            datosInicio={this.datosInicio}
            inRegistro={this.state.inRegistro}
            hospital={this.state.hospital}
            specialities={this.state.specialities}
            unities={this.state.unities}
            datosRegistro={this.datosRegistro}
            datosActualizar={this.datosActualizar}
          />
          <div className="card mx-auto" id="mapibiris">
            <h2>Mapa de centros médicos.</h2>
            <Mapa 
            getLocation = {this.getLocation}
            markers = {hospitals}/>
          </div>
        </div>
      );    
    }
    return (
      <div className="App container" >

        <Navigation 
          changeToLogin={this.changeToLogin}
        />

        <Preferencias />
        <button className="btn btn-info mt-2" type="button" data-toggle="collapse" data-target="#panel" aria-expanded="false" aria-controls="panel" id="Buscar">RECOMENDACIONES</button>
       
        <div className="card mx-auto mt-2">
          <Mapa 
          getLocation = {this.getLocation}
          markers = {hospitals}/>
         </div>  
      </div>
    );
  }
}

export default App;