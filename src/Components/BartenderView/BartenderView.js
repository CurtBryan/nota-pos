import React, { Component } from "react";
import { setUser } from "../../ducks/userReducer";
import { connect } from "react-redux";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import "./BartenderView.css";

class ServerView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="bartender-page">
        <div className="table-container">
          <button className="tableNavButtons">
            <FaAngleDoubleLeft />
          </button>
          <button className="table" />
          <button className="table" />
          <button className="table" />
          <button className="table" />
          <button className="table" />
          <button className="tableNavButtons">
            <FaAngleDoubleRight />
          </button>
        </div>
        <div className="menu-selections">
          <div className="circle-container">
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
          </div>
        </div>
        <div className="info-section">
          <div className="items-container">
            <section className="menu-items">
              <div className="box item1" />
              <div className="box item1" />
              <div className="box item1" />
              <div className="box item1" />
              <div className="box item1" />
            </section>
            <section className="menu-items">
              <div className="box item2" />
              <div className="box item2" />
              <div className="box item2" />
              <div className="box item2" />
              <div className="box item2" />
            </section>
            <section className="menu-items">
              <div className="box item3" />
              <div className="box item3" />
              <div className="box item3" />
              <div className="box item3" />
              <div className="box item3" />
            </section>
            <section className="menu-items">
              <div className="box item4" />
              <div className="box item4" />
              <div className="box item4" />
              <div className="box item4" />
              <div className="box item4" />
            </section>
          </div>
          <div className="tickets">
            <p className="title">NOTA-POS</p>
            <div className="bar" />
            <div className="ticket" />
            <div className="price-tag" />
          </div>
        </div>
        <footer>
          <button className="logout"> LOGOUT </button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(ServerView);
