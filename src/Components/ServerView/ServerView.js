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
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import './ServerView.css';


class ServerView extends Component {
    constructor(){
        super()
        this.state = {

        }
    }



    render(){
        return(
            <div className="server-page" >
                <div className="table-container">
                    <button className="tableNavButtons">
                     <FaAngleDoubleLeft />
                    </button>
                    <button className="table"></button>
                    <button className="table"></button>
                    <button className="table"></button>
                    <button className="table"></button>
                    <button className="table"></button>
                    <button className="tableNavButtons">
                     <FaAngleDoubleRight />
                    </button>
                </div>
                <div className="middleCont">
                    <div className="menu-selections">
                        <div className="circle-container">
                            <div className="circle">
                                <img  className="sides" src={sides} alt="sides"/> Sides</div>
                            <div className="circle">
                                 <img  className="steak" src={steak} alt="steak"/>Food</div>
                            <div className="circle">
                                 <img  className="pie" src={pie} alt="pie"/>Dessert</div>
                            <div className="circle">
                            <img  className="drinks" src={drinks} alt="drinks"/>Drinks</div>
                        </div>
                    </div>
                   
                    <div className="info-section">
                   
                        <div className="items-container">
                            <section className="menu-items">
                                <div className="box item1"></div>
                                <div className="box item1"></div>
                                <div className="box item1"></div>
                                <div className="box item1"></div>
                                <div className="box item1"></div>
                            </section>
                            <section className="menu-items">
                                <div className="box item2"></div>
                                <div className="box item2"></div>
                                <div className="box item2"></div>
                                <div className="box item2"></div>
                                <div className="box item2"></div>
                            </section>
                            <section className="menu-items">
                                <div className="box item3"></div>
                                <div className="box item3"></div>
                                <div className="box item3"></div>
                                <div className="box item3"></div>
                                <div className="box item3"></div>
                            </section>
                            <section className="menu-items">
                                <div className="box item4"></div>
                                <div className="box item4"></div>
                                <div className="box item4"></div>
                                <div className="box item4"></div>
                                <div className="box item4"></div>
                            </section>
                          
                        </div>
                      

                        <button className="logout"> LOGOUT </button>
                        </div>
                        <div className="tickets">
                            <p className="title">POS-SYSTEM</p>
                            <div className="bar" ></div>
                            <div className="ticket"></div>
                            <div className="price-tag"></div>
                        
                    
                            <div className="extra">
                                <img className="price" src={price} alt="sides"/>
                                <img className="trash" src={trash} alt="sides"/>
                                <img className="print" src={print} alt="sides"/>
                            </div>
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

export default invokedConnect(ServerView)