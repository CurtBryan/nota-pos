import React, { Component } from "react";
import axios from "axios";
import { setEmployees, setMenu } from "../../ducks/restaurantReducer";
import { setAllTickets } from "../../ducks/ticketReducer";
import { connect } from "react-redux";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./ManagerView.css";
import ServerMV from "./ServerMV";

class ManagerView extends Component {
  constructor() {
    super();
    this.state = {
      editMenu: true,
      editItem: false,
      EditEmployee: false,
      division: "",
      item: "",
      sendToBar: false,
      price: 0,
      empName: "",
      jobTitle: "",
      pin: 0
    };
  }

  componentDidMount = () => {
    const { user } = this.props.userInfo;
    this.props.setEmployees(user);
    // this.props.setAllTickets();
    this.props.setMenu(user);
  };

  universalHandler = (prop, value) => {
    this.setState({
      [prop]: value
    });
  };

  // addItemToMenu = () => {
  //   const {}
  // };

  render() {
    console.log(this.state);
    const {
      editItem,
      division,
      item,
      sendToBar,
      price,
      empName,
      jobTitle,
      pin
    } = this.state;
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
        <div className="middleContMV">
          <div className="menu-selectionsMV">
            <div className="circle-containerMV">
              <button className="circleMV">App</button>
              <button className="circleMV">Entree</button>
              <button className="circleMV">Dessert</button>
              <button className="circleMV">Drink</button>
            </div>
          </div>
          <div className="info-section">
            <div className="items-containerMV">
              <section className="menu-itemsMV">
                <div className="boxMV item1MV" />
                <div className="boxMV item1MV" />
                <div className="boxMV item1MV" />
                <div className="boxMV item1MV" />
                <div className="boxMV item1MV" />
              </section>
              <section className="menu-itemsMV">
                <div className="boxMV item2MV" />
                <div className="boxMV item2MV" />
                <div className="boxMV item2MV" />
                <div className="boxMV item2MV" />
                <div className="boxMV item2MV" />
              </section>
              <section className="menu-itemsMV">
                <div className="boxMV item3MV" />
                <div className="boxMV item3MV" />
                <div className="boxMV item3MV" />
                <div className="boxMV item3MV" />
                <div className="boxMV item3MV" />
              </section>
              <section className="menu-itemsMV">
                <div className="boxMV item4MV" />
                <div className="boxMV item4MV" />
                <div className="boxMV item4MV" />
                <div className="boxMV item4MV" />
                <div className="boxMV item4MV" />
              </section>
            </div>
            <div className="ticketsMV">
              <p className="titleMV">POS-SYSTEM</p>
              <div className="barMV" />
              <div className="ticketMV">
                {this.state.editMenu ? (
                  <div className="addItemInfoBox">
                    {" "}
                    <h1>ADD MENU ITEM</h1>
                    <div className="inputContItemMV">
                      <div>
                        <h2>Catergory:</h2>
                        <select
                          onChange={e => {
                            if (!division === "Choose One...") {
                              this.setState({
                                division: e.target.value
                              });
                            } else {
                              this.setState({
                                division: ""
                              });
                            }
                          }}
                        >
                          <option value="Choose One...">Choose One...</option>
                          <option value="App">App</option>
                          <option value="Entree">Entree</option>
                          <option value="Dessert">Dessert</option>
                          <option value="Drink">Drink</option>
                        </select>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={() => {
                            this.setState({
                              sendToBar: !sendToBar
                            });
                          }}
                        />
                        <h2>Send Ticket to Bar?</h2>
                      </div>
                      <div>
                        <h2>Item Name:</h2>
                        <input
                          onChange={e => {
                            this.setState({
                              item: e.target.value
                            });
                          }}
                        />
                      </div>
                      <div>
                        <h2>Price:</h2>
                        <input
                          type="number"
                          onChange={e => {
                            this.setState({
                              price: e.target.value
                            });
                          }}
                        />
                      </div>
                    </div>
                    <button>ADD ITEM</button>
                  </div>
                ) : (
                  <div className="addEmpInfoBox">
                    <h1>ADD EMPLOYEE</h1>
                    <div className="inputContEmpMV">
                      <div>
                        <h2>Name:</h2>
                        <input />
                      </div>
                      <div>
                        <h2>Job Title:</h2>
                        <select
                          onChange={e => {
                            if (!division === "Choose One...") {
                              this.setState({
                                jobTitle: e.target.value
                              });
                            } else {
                              this.setState({
                                jobTitle: ""
                              });
                            }
                          }}
                        >
                          <option>Choose One...</option>
                          <option>Bartender</option>
                          <option>Chef</option>
                          <option>Manager</option>
                          <option>Server</option>
                        </select>
                      </div>
                      <div>
                        <h2>Pin Number:</h2>
                        <input
                          type="number"
                          onChange={e => {
                            this.setState({
                              pin: e.target.value
                            });
                          }}
                        />
                      </div>
                    </div>
                    <button>ADD EMPLOYEE</button>
                  </div>
                )}
              </div>
              <div className="price-tagMV" />
            </div>
          </div>
        </div>
        <footer className="footerMV">
          <div className="footerButtonsMV">
            <button className="logout">LOGOUT</button>
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
            <NavLink to="/servermv">
              <button className="logout">DINING</button>
            </NavLink>
            <NavLink to="/cookmv">
              <button className="logout">KITCHEN</button>
            </NavLink>
            <NavLink to="barmv">
              <button className="logout">BAR</button>
            </NavLink>
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
  setEmployees,
  // setAllTickets,
  setMenu
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(ManagerView);
