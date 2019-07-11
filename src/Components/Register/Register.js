import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../../ducks/userReducer';
import { connect } from 'react-redux';
import './Register.css';



class Register extends Component {
    constructor(props){
        super(props) 
        this.state = {
            typedName: "", 
            typedEmail: "", 
            typedPassword: "",
            Redirect: false,
            positon: null

        }
    }

    componentWillMount(){
        this.registerHandler()
    }

    registerHandler = (prop, value) => {
        this.setState({
            [prop]: value
        })
    }

    registerAccount = () => {

        // Note Request Error 
        const {typedName, typedEmail, typedPassword}  = this.state
        console.log(typedName, typedEmail, typedPassword)
        axios.post("/api/register", { typedName, typedEmail, typedPassword}).then(res => {

            this.props.setUser(res.data)
            console.log(res.data)
        }).catch((err) => {console.log("RIGISTER", err)})


    }

    render(){
     
        if(this.state.Redirect){
            if( this.state.position === "Server") {
            return <Redirect to='/server' />
            }
            if(this.state.position === "Chef") {
            return <Redirect to='/cook' />
            }
           
            if(this.state.position === "Bartender") {
            return <Redirect to='/bartender' />
            }
            if(this.state.positon === "Manager") {
             return <Redirect to='/manager' />
            }

        }

        return (
            <div className="form-container">
                <div className="form">
                    <p className= "title-pos">NotaPOS</p>
                        <div>
                            <input 
                            placeholder="Name"
                            onChange={e => 
                                this.registerHandler(e.target.name, e.target.value)
                            }
                            type="text"
                            value={this.state.typedName}
                            name="typedName"
                            />
                            <input 
                            placeholder="Email"
                            onChange={e => 
                                this.registerHandler(e.target.name, e.target.value)
                            }
                            type="text"
                            value={this.state.typedEmail}
                            name="typedEmail"
                            />
                            <input 
                            placeholder="Password"
                            onChange={e => 
                                this.registerHandler(e.target.name, e.target.value)
                            }
                            type="current-password"
                            value={this.state.typedPassword}
                            name="typedPassword"
                            />
                        
                                <button onClick={this.registerAccount}> Register </button>
                             
                        </div>
                       
                       <Link to="/login" style={{ textDecoration: 'none'}}>
                            <p className="account">Do you have an account?</p>
                       </Link>
                </div>
            </div>
        )
    }

  
}


const mapStateToProps = (reduxState) => {
    return reduxState
}

const mapDispatchToProps = {
    setUser
}


const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default invokedConnect( Register )