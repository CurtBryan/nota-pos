import React, {Component} from 'react';
import { setUser } from '../../ducks/userReducer';
import { connect } from 'react-redux';
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
                <div className="menu-selections">
                    <div className="circle-container">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
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
                    <div className="tickets">
                        <p className="title">POS-SYSTEM</p>
                        <div className="bar"></div>
                        <div className="ticket"></div>
                        <div className="price-tag"></div>
                    </div>
                    
                </div>
                <footer>
                    <button className="logout"> LOGOUT </button>
                </footer>
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