import React, { Component } from 'react';
import axios from 'axios';
import { setUser } from '../../ducks/userReducer';
import { connect } from 'react-redux';
import './Register.css';



class Register extends Component {
    constructor(props){
        super(props) 
        this.state = {
            name : "",
            email: "",
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

        // Note Request Error 
        const { name, email, password } = this.state
        axios.post("/api/register", { name, email, password}).then(res => {
            this.setState({name: "", email: "", password: ""})
            this.props.setEmployee(res.data)
            console.log(res.data)
        }).catch((err) => {console.log("RIGISTER", err)})


    }

    render(){
        return (
            <div className="form">
                <div>
                    <input 
                    placeholder="name"
                    onChange={e => 
                        this.registerHandler(e.target.name, e.target.value)
                    }
                    type="text"
                    value={this.state.name}
                    name="name"
                    />
                    <input 
                    placeholder="email"
                    onChange={e => 
                        this.registerHandler(e.target.name, e.target.value)
                    }
                    type="text"
                    value={this.state.email}
                    name="email"
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
    setUser
}


const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default invokedConnect( Register )