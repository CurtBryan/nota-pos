import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../ducks/userReducer";
import { setEmployees, selectEmployee } from "../../ducks/restaurantReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../EmpLogin/EmpLogin.css";
import ManagerView from "../ManagerView/ManagerView";
import ServerView from "../ServerView/ServerView";
import CookView from "../CookView/CookView";
import BartenderView from "../BartenderView/BartenderView";

class EmpLogin extends Component {
  constructor() {
    super();
    this.state = {
      pin: 0
    };
  }

  componentDidMount() {
    // this.empLoginAccount()
    // console.log(this.props.userInfo)
    this.props.setEmployees(this.props.userInfo.user);
  }

  empLoginPinHandler = value => {
    this.setState({
      pin: value
    });
  };

  empLoginAccount = () => {
    const { pin } = this.state;
    const { user } = this.props.userInfo;
    //  Add post endpoint for account login
    this.props.selectEmployee(user, pin);
  };

  conRender = () => {
    const { currentEmployeePos } = this.props.restaurantInfo;
    // console.log(currentEmployeePos);
    if (currentEmployeePos === "Manager") {
      return <Redirect to="/manager" />;
    } else if (currentEmployeePos === "Server") {
      return <Redirect to="/server" />;
    } else if (currentEmployeePos === "Chef") {
      return <Redirect to="/cook" />;
    } else if (currentEmployeePos === "Bartender") {
      return <Redirect to="/bartender" />;
    } else {
      return (
        <div className="form-container">
          <div>
            <p className="title-pos">NotaPOS</p>
            <div className="info-card">
              <input
                placeholder="Pin"
                onChange={e =>
                  this.setState({
                    pin: e.target.value
                  })
                }
                type="text"
                value={this.pin}
                name="pin"
              />
              <button className="account-btn" onClick={this.empLoginAccount}>
                Submit
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    // console.log(this.props.restaurantInfo.currentEmployeePos);
    return this.conRender();
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setEmployees,
  selectEmployee,
  setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmpLogin);
