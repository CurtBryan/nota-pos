import React, { Component } from "react";
import {
  setEmployees,
  selectEmployee,
  setMenu
} from "../../ducks/restaurantReducer";
import axios from "axios";
// import { setAllTickets } from "../../ducks/ticketReducer";
import { connect } from "react-redux";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTrashAlt
} from "react-icons/fa";
import { NavLink, Redirect } from "react-router-dom";
import "./ManagerView.css";

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
      editPrice: true,
      oldPin: 0,
      editEmpPin: false,
      editItemPrice: false
    };
    this.toggleSwitch1 = this.toggleSwitch1.bind(this);
    this.toggleSwitch2 = this.toggleSwitch2.bind(this);
    this.deleteEmp = this.deleteEmp.bind(this);
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

  toggleSwitch1() {
    this.setState({
      editMenu: true,
      EditEmployee: false
    });
  }
  toggleSwitch2() {
    this.setState({
      editMenu: false,
      EditEmployee: true
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

  deleteEmp(pin) {
    const { user } = this.props.userInfo;
    axios.delete(`/api/employee?restaurant=${user}&pin=${pin}`).then(() => {
      this.props.setEmployees(user);
    });
  }

  logout = () => {
    this.props.selectEmployee(null);
  };

  render() {
    const { divSelect } = this.state;
    const { division, sendToBar, editMenu } = this.state;

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
                  <button onClick={() => this.deleteEmp(emp.pin)}>
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
        {!this.state.redirect ? null : (
          <div>
            <Redirect to="/serverMV" />
          </div>
        )}
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
                          min="0"
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
                          min="0"
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
              className="logout-btn"
            >
              LOGOUT
            </button>
            <button className="logout-btn" onClick={this.toggleSwitch1}>
              {" "}
              EDIT MENU{" "}
            </button>
            <button className="logout-btn" onClick={this.toggleSwitch2}>
              {" "}
              EDIT EMPLOYEES{" "}
            </button>
            <button
              className="logout-btn"
              onClick={() => {
                this.setState({
                  redirect: true
                });
              }}
            >
              {" "}
              SEE TICKETS{" "}
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
  setEmployees,
  selectEmployee,
  setMenu
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(ManagerView);
