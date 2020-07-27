import React, {Component} from 'react';

const validate = values => {
    const errors = {}
    if(!values.name){
        errors.name = "Este campo es obligatorio"
    }
    if(!values.email){
        errors.email = "Este campo es obligatorio"
    }
    else if(values.email.indexOf('@') == -1){
        errors.email = "No es una dirección válida"
    }
    if(!values.password){
        errors.password = "Este campo es obligatorio"
    }
    else{
        if(!values.confpassword){
            errors.confpassword = "Este campo es obligatorio"
        }
        else if(values.password != values.confpassword){
            errors.confpassword = "Las contraseñas no coinciden"
        }
    }
    return errors
}

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            stateForm: {
                login: true,
                loginError: false,
                signIn: false,
                signInError: false,
            },
            errors: {},
        }
    }

    handleChange = ({target}) => {
        const {name, value} = target
        this.setState({[name]: value})
    }
    verifyRegister = e => {
        e.preventDefault()
        const {errors, stateForm, ...formData} = this.state
        const result = validate(formData)
        this.setState({errors: result})
    }
    onNeedRegister = () => {
        this.setState(() => ({
                stateForm: {
                    login: false,
                    loginError: false,
                    signIn: true,
                    signInError: false,
                }

                // this.setStateForm(() => ({
                //     login: false
                // }))
            })
        )        
    }
    render(){
        if(this.state.stateForm.login){
            return(
                <div className="row">
                    <div className="card col-12 col-md-8 offset-md-2">
                        <div className="card-head">
                            <h1>Ingresar como centro médico</h1>
                        </div>
                        <div className="card-body">
    
                            <div className="form">
                                <div className="row">
    
                                <div className="form-group col-12 col-md-8 offset-md-2">
                                    <input type="text" className="form-control form-xs" placeholder="Correo Electrónico"/>
                                {/* </div> */}
                                {/* <div className="form-group col-md-8 offset-md-2"> */}
                                    <input type="password" className="form-control form-xs" placeholder="Contraseña"/>
                                </div>
                                <button type="button" className = "btn btn-success col-md-4 offset-md-4">Ingresar</button>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-link" onClick={this.onNeedRegister}>¿No estás registrado? Regístrate aquí</button>
    
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="row">
                    <div className="card col-12 col-md-8 offset-md-2">
                        <div className="card-head">
                            <h1>Registro</h1>
                        </div>
                        <div className="card-body">
    
                            <div className="form" onSubmit ={this.verifyRegister}>
                                <div className="row">
    
                                <div className="form-group col-12 col-md-8 offset-md-2">
                                    <input onChange = {this.handleChange} name = "name" type="text" className="form-control" placeholder="Nombre del centro médico"/>
                                    {this.state.errors.name && <a> {this.state.errors.name}    </a>}
                                    <input onChange = {this.handleChange} name = "email" type="text" className="form-control" placeholder="Correo electrónico de contacto"/>
                                    {this.state.errors.email && <a> {this.state.errors.email}    </a>}
                                    <input onChange = {this.handleChange} name = "password" type="password" className="form-control form-xs" placeholder="Contraseña"/>
                                    {this.state.errors.password && <a> {this.state.errors.password}    </a>}
                                    <input onChange = {this.handleChange} name = "confpassword" type="password" className="form-control form-xs" placeholder="Verificar Contraseña"/>
                                    {this.state.errors.confpassword && <a> {this.state.errors.confpassword}    </a>}
                                </div>
                                <button className = "btn btn-success col-md-4 offset-md-4" onClick={this.verifyRegister}>Regístrame</button>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            );
        }
    }
}


export default Login;
