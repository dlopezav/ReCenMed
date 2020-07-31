import React, { Component } from 'react';


class Navigation extends Component {

  activarLogin = () =>{
    this.props.changeToLogin()
  }
  changeButton(){
    if(this.props.inLogin){
      return(
        <button className="btn btn-danger" onClick={this.activarLogin}>
            Salir a mapa
        </button>
      )
    }
    else{
      return(
        <button className="btn btn-secondary" onClick={this.activarLogin}>
            Log In
        </button>
      )
    }
  }
  render() {
    return (
      <div className="navbar navbar-light bg-light mt-2" id="nav">
        <a className="navbar-brand mr-auto" id="title"><strong>ReCenMed </strong></a>
        {this.changeButton()}
      </div>
    );
  }
}

export default Navigation;