import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/userReducer';
import './Login.css';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            typedEmail: "",
            typedPassword: ""

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
        return(
            <div className="form-container">
                <div className="form">
                <p className= "title">NonaPOS</p>
                        <div>
                            <input 
                            placeholder="email"
                            onChange={e => 
                                this.loginEmailHandler(e.target.value)
                            }
                            type="text"
                            value={this.typedEmail}
                            name="typedEmail"

                            />

                            <input 
                            placeholder="password"
                            onChange={e => 
                                this.loginPasswordHandler(e.target.value)
                            }
                            type="text"
                            value={this.typedPassword}
                            name="typedPassword"

                            />

                            <button onClick={this.loginAccount}>Submit</button>
                        </div>
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