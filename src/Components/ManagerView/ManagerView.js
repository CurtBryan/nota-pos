import React, { Component } from "react";
import {
  setEmployees,
  selectEmployee,
  setMenu
} from "../../ducks/restaurantReducer";
import axios from "axios";
import { setAllTickets } from "../../ducks/ticketReducer";
import { connect } from "react-redux";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTrashAlt,
  FaEdit
} from "react-icons/fa";
import { NavLink, Redirect } from "react-router-dom";
import "./ManagerView.css";
import ServerMV from "./ServerMV";
import Axios from "axios";

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
      pin: 0,
      redirect: false,
      divSelect: 0,
      editPrice: true
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  componentDidMount = () => {
    const { user } = this.props.userInfo;
    this.props.setEmployees(user);
    // this.props.setAllTickets();
    this.props.setMenu(user);
  };

  componentWillUnmount() {}

  universalHandler = (prop, value) => {
    this.setState({
      [prop]: value
    });
  };

  toggleSwitch() {
    this.setState({
      editMenu: !this.state.editMenu,
      EditEmployee: !this.state.EditEmployee
    });
  }

  addItemToMenu = () => {
    const { user } = this.props.userInfo;
    const { division, item, price, sendToBar } = this.state;
    axios
      .post("/api/items", {
        restaurant: user,
        division: division,
        item: item,
        price: price,
        drink: sendToBar
      })
      .then(() => {
        this.props.setMenu(user);
      });
  };
  addEmployee = () => {
    const { user } = this.props.userInfo;
    const { jobTitle, pin, empName } = this.state;
    axios
      .post("/api/newEmployee", {
        restaurant: user,
        name: empName,
        position: jobTitle,
        pin: pin
      })
      .then(() => {
        this.props.setEmployees(user);
      });
  };

  // editItem = (division, price, id) => {
  //   const {user} = this.props.userInfo
  //    axios.put("/api/items", {user, division, price, id}).then(res => {

  //    })
  // };

  logout = () => {
    this.props.selectEmployee(null);
  };

  render() {
    const { divSelect } = this.state;
    const {
      editItem,
      division,
      item,
      sendToBar,
      price,
      empName,
      jobTitle,
      pin,
      editMenu
    } = this.state;

    let display;

    if (!this.props.restaurantInfo.menu.length) {
      display = [];
    } else if (editMenu) {
      display = this.props.restaurantInfo.menu[divSelect].items.map(item => {
        return (
          <div key={item._id}>
            <section className="menu-itemsMV">
              <div className="boxMV item1MV">
                <h1>{item.item}</h1>
                <h1>${item.price}</h1>
                <div>
                  <button>
                    <FaEdit />
                  </button>
                  <button>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
      });
    } else {
      display = this.props.restaurantInfo.employees.map(emp => {
        return (
          <div key={emp._id}>
            <section className="menu-itemsMV">
              <div className="boxMV item1MV">
                <h1>{emp.name}</h1>
                <h2>{emp.position}</h2>
                <h2>{emp.pin}</h2>
                <div>
                  <button>
                    <FaEdit />
                  </button>
                  <button>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
      });
    }

    return (
      <div className="manager-page">
        {!this.props.restaurantInfo.currentEmployeePos ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : null}
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
              <button
                onClick={() =>
                  this.setState({
                    divSelect: 0
                  })
                }
                className="circleMV"
              >
                App
              </button>
              <button
                onClick={() =>
                  this.setState({
                    divSelect: 1
                  })
                }
                className="circleMV"
              >
                Entree
              </button>
              <button
                onClick={() =>
                  this.setState({
                    divSelect: 2
                  })
                }
                className="circleMV"
              >
                Dessert
              </button>
              <button
                onClick={() =>
                  this.setState({
                    divSelect: 3
                  })
                }
                className="circleMV"
              >
                Drink
              </button>
            </div>
          </div>
          <div className="info-section">
            <div className="items-containerMV">
              <div className="menu-itemsMV">{display}</div>
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
                            if (e.target.value !== "Choose One...") {
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
                    <button onClick={this.addItemToMenu}>ADD ITEM</button>
                  </div>
                ) : (
                  <div className="addEmpInfoBox">
                    <h1>ADD EMPLOYEE</h1>
                    <div className="inputContEmpMV">
                      <div>
                        <h2>Name:</h2>
                        <input
                          onChange={e => {
                            this.setState({
                              empName: e.target.value
                            });
                          }}
                        />
                      </div>
                      <div>
                        <h2>Job Title:</h2>
                        <select
                          onChange={e => {
                            if (division !== "Choose One...") {
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
                    <button onClick={this.addEmployee}>ADD EMPLOYEE</button>
                  </div>
                )}
              </div>
              <div className="price-tagMV" />
            </div>
          </div>
        </div>
        <footer className="footerMV">
          <div className="footerButtonsMV">
            <button
              onClick={() => {
                this.logout();
              }}
              className="logout"
            >
              LOGOUT
            </button>
            <button className="logout" onClick={this.toggleSwitch}>
              {" "}
              EDIT MENU{" "}
            </button>
            <button className="logout" onClick={this.toggleSwitch}>
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
  selectEmployee,
  setMenu
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(ManagerView);
