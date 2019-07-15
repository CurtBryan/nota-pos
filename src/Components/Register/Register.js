import React, { Component } from 'react';
import Login from '../Login/Login';
import { Link } from 'react-router-dom';
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
        const {user} = this.props.setUser

        return (
        <div>
            { user ? (
                <Login />) 
                : (
                    <div className="form-container">
                        <div className="form">
                            <p className= "title-pos">NotaPOS</p>
                                <div className="info-card">
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
                                        <button className="account-btn" onClick= {this.registerAccount}> Register </button>
                                </div>
                                
                                <Link to="/" style={{ textDecoration: 'none'}}>
                                        <p className="account">Do you have an account?</p>
                                </Link>
                            </div>
                    </div>
            
             )}
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