import React, {Component} from 'react';


class Preferencias extends Component{
    render(){
        return(
            <div className="jumbotron" id="panel">
                <form >
                    <div className="row">
                        <div className="form-group col-md-8 offset-md-2 col-10 offset-1" id="inputs">
                            <input type="text" className="form-control form-control-xs" placeholder="Ingrese...."/>
                            <input type="text" className="form-control form-control-xs" placeholder="Ingrese...."/>
                            <input type="text" className="form-control form-control-xs" placeholder="Ingrese...."/>
                        </div>
                        <div className="form-group col-md-6 offset-md-3 col-10 offset-1">
                            <button type="submit" className="btn btn-sm btn-primary btn-block">Aceptar</button>
                        </div>
                    </div>
                </form>
            </div>
        );        
    }
}

export default Preferencias;