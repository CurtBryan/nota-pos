import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import axios from 'axios';
import { setUser } from '../../ducks/userReducer';
import { setEmployees, selectEmployee } from '../../ducks/restaurantReducer';
import { connect } from  'react-redux';
import '../EmpLogin/EmpLogin.css';


class EmpLogin extends Component {
    constructor(){
        super()
        this.state = {
            pin: null
        }
    }

    componentDidMount(){
        // this.empLoginAccount()
        // console.log(this.props.userInfo)
        this.props.setEmployees(this.props.userInfo.user)
    
    
    }

    empLoginPinHandler = ( value ) => {
        this.setState({
            pin: value
        })
    }



    
    empLoginAccount = () => {
        console.log(this.props.restaurantInfo.employees)
        const { pin } = this.state 
        //  Add post endpoint for account login
        axios.post(`/api/employee/$restaurant`, { pin }).then(res => {

            this.props.selectEmployee(res.data)
            console.log(res.data)
        }).catch((err) => console.log("EMPLOGIN", err))

    }

    render(){
    // console.log(this.props)
        return(
          
                    <div className="form-container">
                        <Logo />
                        <div className="form">
                        <p className= "title-pos">NotaPOS</p>
                            <div className="info-card">
                                <input
                                placeholder="Pin"
                                onChange={e =>
                                    this.setState({
                                        pin: e.target.value
                                    })}
                                type="text"
                                value={this.pin}
                                name= "pin"
                                />
                                <button className ="account-btn" onClick={this.empLoginAccount}>Submit</button>
                            </div>
                        </div>
                    </div>) 
            
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const mapDispatchToProps = {
    setEmployees,
    selectEmployee,
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(EmpLogin)