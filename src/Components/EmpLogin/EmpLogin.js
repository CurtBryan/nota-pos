import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { setUser } from "../../ducks/userReducer";
import { connect } from "react-redux";
import "../EmpLogin/EmpLogin.css";

class EmpLogin extends Component {
  constructor() {
    super();
    this.state = {
      employee: ""
    };
  }

  componentWillMount() {
    console.log(this.props);
  }

  empLoginHandler = (prop, value) => {
    this.setState({
      [prop]: value
    });
  };

  empLoginAccount = () => {
    // Add post endpoint for account login
    axios.post();
  };

  render() {
    console.log(this.props);
    if (this.state.Redirect) {
      if (this.state.position === "Server") {
        return <Redirect to="/server" />;
      }
      if (this.state.position === "Chef") {
        return <Redirect to="/cook" />;
      }
      if (this.state.position === "Bartender") {
        return <Redirect to="/bartender" />;
      }
      if (this.state.positon === "Manager") {
        return <Redirect to="/manager" />;
      }
    }
    return (
      <div className="form-container">
        <div className="form">
          <p className="title-pos">NotaPOS</p>
          <div className="info-card">
            <input
              placeholder="employee"
              onChange={e =>
                this.empLoginHandler(e.target.namae, e.target.value)
              }
              type="text"
              value={this.employee}
              name="employee"
            />
            <button className="account-btn" onClick={this.empLoginAccount}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxStates => {
  return reduxStates;
};

const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(EmpLogin);
