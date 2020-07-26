import React, {Component} from 'react';


class Navigation extends Component{
    render(){
        return(
          <div className= "navbar navbar-light bg-light" id="nav">
            <a className= "navbar-brand mr-auto" id="title"><strong>ReCenMed </strong></a>
            <button className="btn btn-secondary">
              Login
            </button>
          </div>
        );        
    }
}

export default Navigation;