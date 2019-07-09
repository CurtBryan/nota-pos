import React, {Component} from 'react';
import { setUser } from '../../ducks/userReducer';
import { connect } from 'react-redux';
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
                    <div className="table"></div>
                    <div className="table"></div>
                    <div className="table"></div>
                    <div className="table"></div>
                    <div className="table"></div>
                </div>
                <div className="items-container">
                    <header className="menu-items">
                        <div className="box item1"></div>
                        <div className="box item1"></div>
                        <div className="box item1"></div>
                        <div className="box item1"></div>
                        <div className="box item1"></div>
                    </header>
                    <header className="menu-items">
                        <div className="box item2"></div>
                        <div className="box item2"></div>
                        <div className="box item2"></div>
                        <div className="box item2"></div>
                        <div className="box item2"></div>
                    </header>
                    <header className="menu-items">
                        <div className="box item3"></div>
                        <div className="box item3"></div>
                        <div className="box item3"></div>
                        <div className="box item3"></div>
                        <div className="box item3"></div>
                    </header>
                    <header className="menu-items">
                        <div className="box item4"></div>
                        <div className="box item4"></div>
                        <div className="box item4"></div>
                        <div className="box item4"></div>
                        <div className="box item4"></div>
                    </header>
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