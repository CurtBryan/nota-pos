import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/userReducer';
import './Login.css';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            typedEmail: "",
            typedPassword: "",
            Redirect: false,
            positon: null

        }
    }

    componentDidMount(){
        this.loginEmailHandler()
        this.loginPasswordHandler()
    }

    loginEmailHandler = ( value ) => {
        this.setState({
            typedEmail: value,
        })
    }

    loginPasswordHandler = ( value ) => {
        this.setState({
            typedPassword: value,
        })
    }


    loginAccount = () => {
        const { typedEmail,  typedPassword } = this.state
         // Add post endpoint for account login
         console.log(this.state)
        axios.post("/api/login", { typedEmail, typedPassword}).then(res => {

            this.props.setUser(res.data)
            console.log(res.data)
        }).catch((err) => console.log("LOGIN",err))
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
        return(
            <div className="form-container">
                <div className="form">
                <p className= "title-pos">NotaPOS</p>
                        <div>
                            <input 
                            placeholder="Email"
                            onChange={e => 
                                this.loginEmailHandler(e.target.value)
                            }
                            type="text"
                            value={this.typedEmail}
                            name="typedEmail"

                            />

                            <input 
                            placeholder="Password"
                            onChange={e => 
                                this.loginPasswordHandler(e.target.value)
                            }
                            type="text"
                            value={this.typedPassword}
                            name="typedPassword"

                            />

                            <button onClick={this.loginAccount}>Submit</button>
                        </div>

                        <Link to="/" style={{ textDecoration: 'none'}}>
                            <p className="account">Need to create an account?</p>
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

export default invokedConnect( Login )