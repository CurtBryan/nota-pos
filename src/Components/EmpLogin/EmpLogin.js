import React, { Component } from 'react';
import axios from 'axios';
import { setUser } from '../../ducks/userReducer';
import { connect } from  'react-redux';
import '../EmpLogin/EmpLogin.css';


class EmpLogin extends Component {
    constructor(){
        super()
        this.state = {
            employee: ""
        }
    }

    componentDidMount(){
        this.empLoginAccount()
    }

    empLoginHandler = (prop, value) => {
        this.setState({
            [prop]: value
        })
    }

    empLoginAccount = () => {

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
                        this.empLoginHandler(e.target.namae, e.target.value)}
                    type="text"
                    value={this.employee}
                    name= "employee"
                    />
                    <button onClick={this.empLoginAccount}>Submit</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxStates) => {
    return reduxStates
}

const mapDispatchToProps = {
    setUser
}

const invokedConnect = connect (
    mapStateToProps,
    mapDispatchToProps

)

export default invokedConnect( EmpLogin )