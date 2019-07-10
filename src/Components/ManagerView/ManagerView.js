import React, { Component } from "react";
import { setUser } from "../../ducks/userReducer";
import { connect } from "react-redux";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import "./ManagerView.css";

class ManagerView extends Component {
  constructor() {
    super();
    this.state = {
      editMenu: false,
      editItem: false,
      EditEmployee: true,
      division: "",
      item: "",
      price: 0,
      empName: "",
      jobTitle: "",
      pin: 0
    };
  }

  universalHandler = (prop, value) => {
    this.setState({
      [prop]: value
    });
  };

  render() {
    return (
      <div className="manager-page">
        <div className="table-containerMV">
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
          <div className="items-containerMV">
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
            <p className="title">POS-SYSTEM</p>
            <div className="bar" />
            <div className="ticket">
              {this.state.editMenu ? (
                <div>
                  {" "}
                  <h1>EDIT MENU</h1>
                  <div>
                    <div>
                      <h2>Catergory:</h2>
                      <select>
                        <option value="App">App</option>
                        <option value="Entree">Entree</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Drink">Drink</option>
                      </select>
                    </div>
                    <div>
                      <input type="checkbox" />
                      <h2>Send Ticket to Bar?</h2>
                    </div>
                    <div>
                      <h2>Item Name:</h2>
                      <input />
                    </div>
                    <div>
                      <h2>Price:</h2>
                      <input />
                    </div>
                  </div>
                  <button>ADD ITEM</button>
                </div>
              ) : (
                <div>
                  <h1>EDIT EMPLOYEE</h1>
                  <div>
                    <h2>Name:</h2>
                    <input />
                  </div>
                  <div>
                    <h2>Job Title:</h2>
                    <input />
                  </div>
                  <div>
                    <h2>Pin Number:</h2>
                    <input
                      onChange={e => {
                        this.setState({
                          pin: e.target.value
                        });
                      }}
                    />
                  </div>
                  <button>ADD EMPLOYEE</button>
                </div>
              )}
            </div>
            <div className="price-tag" />
          </div>
        </div>
        <footer>
          <div className="footerButtons">
            <button className="logout"> LOGOUT </button>
            <button
              className="logout"
              onClick={() => {
                this.setState({
                  editMenu: true,
                  EditEmployee: false
                });
              }}
            >
              {" "}
              EDIT MENU{" "}
            </button>
            <button
              className="logout"
              onClick={() => {
                this.setState({
                  editMenu: false,
                  EditEmployee: true
                });
              }}
            >
              {" "}
              EDIT EMPLOYEES{" "}
            </button>
          </div>
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

export default invokedConnect(ManagerView);
