import React, {Component} from 'react';
import { setUser } from '../../ducks/userReducer';
import { connect } from 'react-redux';
import sides from './sides.png';
import steak from './steak.png';
import pie from './pie.png';
import drinks from './drinks.png';
import price from './price.png';
import trash from './trash.png';
import print from './print.png';
import './ServerTest.css';


class ServerView extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div>
                <div className="section-two">

                </div>
                <div className="section-two">

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
    
    export default invokedConnect(ServerView)