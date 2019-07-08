import React, { Component } from 'react';
import axios from 'axios';
import { setEmployee } from '../../ducks/employeeReducer';
import { connect } from 'react-redux';
import './Register.css';



class Register extends Component {
    constructor(props){
        super(props) 
        this.state = {
            store : "",
            employee : "",
            email : "",
            password : ""
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

        // Add post endpoint for account register 
        axios.post()


    }

    render(){
        return (
            <div className="form">
                <div>
                    <input 
                    placeholder="store"
                    onChange={e => 
                        this.registerHandler(e.target.name, e.target.value)
                    }
                    type="number"
                    value={this.state.store}
                    name="store"

                    />
                    <input 
                    placeholder="employee"
                    onChange={e => 
                        this.registerHandler(e.target.name, e.target.value)
                    }
                    type="text"
                    value={this.state.employee}
                    name="employee"
                    />
                    <input 
                    placeholder="email"
                    onChange={e => 
                        this.registerHandler(e.target.name, e.target.value)
                    }
                    type="text"
                    value={this.state.email}
                    name="employee"
                    />
                    <input 
                    placeholder="password"
                    onChange={e => 
                        this.registerHandler(e.target.name, e.target.value)
                    }
                    type="current-password"
                    value={this.state.password}
                    name="password"
                    />

                  
                        <button onClick={this.registerAccount}> Register </button>

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

export default invokedConnect( Register )