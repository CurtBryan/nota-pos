import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setEmployee } from '../../ducks/employeeReducer';
import './Login.css';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            pin_number: "",

        }
    }

    componentDidMount(){
        this.loginHandler()
    }

    loginHandler = (prop, value) => {
        this.setState({
            [prop]: value
        })
    }

    loginAccount = () => {

         // Add post endpoint for account login
        axios.post()
    }

    render(){
        return(
            <div className="form">
                <div>
                    <input 
                    placeholder="employee"
                    onChange={e => 
                        this.loginHandler(e.target.name,e.target.value)
                    }
                    type="text"
                    value={this.pin_number}
                    name="employee"

                    />

                    <button onClick={this.loginAccount}>Submit</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const mapDispatchToProps = {
    setEmployee
}

const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps 
)

export default invokedConnect( Login )