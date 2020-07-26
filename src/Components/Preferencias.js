import React, {Component} from 'react';
import AutocompleteTextBox from './AutocompleteTextBox';


class Preferencias extends Component{
    render(){
        return(
            <div className="jumbotron mt-2 collapse" id="panel">
                <form >
                    <div className="row">
                        <div className="form-group col-md-8 offset-md-2 col-10 offset-1" id="inputs">
                            <input type="text" className="form-control form-control-xs" placeholder="adsf"/>
                            <input type="text" className="form-control form-control-xs" placeholder="adsf"/>
                            <input type="text" className="form-control form-control-xs" placeholder="adsf"/>
                            <input type="text" className="form-control form-control-xs" placeholder="adsf"/>
                            <AutocompleteTextBox />
                        </div>
                        <div className="form-group col-md-4 offset-md-4 col-10 offset-1">
                            <button type="submit" className="btn btn-sm btn-primary btn-block">Aceptar</button>
                        </div>
                    </div>
                </form>
            </div>
        );        
    }
}

export default Preferencias;