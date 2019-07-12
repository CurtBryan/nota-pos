import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/userReducer";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      typedEmail: "",
      typedPassword: ""
    };
  }

  componentDidMount() {
    this.loginEmailHandler();
    this.loginPasswordHandler();
  }

  loginEmailHandler = value => {
    this.setState({
      typedEmail: value
    });
  };

  loginPasswordHandler = value => {
    this.setState({
      typedPassword: value
    });
  };

  loginAccount = async () => {
    const { typedEmail, typedPassword } = this.state;
    // Add post endpoint for account login
    console.log(this.state);
    axios
      .post("/api/login", { typedEmail, typedPassword })
      .then(res => {
        this.props.setUser(res.data);
        console.log(res.data);
      })
      .catch(err => console.log("LOGIN", err));
  };

  render() {
    return (
      <div className="form-container">
        <div className="form">
          <p className="title-pos">NotaPOS</p>
          <div className="info-card">
            <input
              placeholder="Email"
              onChange={e => this.loginEmailHandler(e.target.value)}
              type="text"
              value={this.typedEmail}
              name="typedEmail"
            />

            <input
              placeholder="Password"
              onChange={e => this.loginPasswordHandler(e.target.value)}
              type="text"
              value={this.typedPassword}
              name="typedPassword"
            />

            <Link to="/emplogin" style={{ textDecoration: "none" }}>
              <button className="account-btn" onClick={this.loginAccount}>
                Submit
              </button>
            </Link>
          </div>

          <Link to="/" style={{ textDecoration: "none" }}>
            <p className="account">Need to create an account?</p>
          </Link>
        </div>
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

export default invokedConnect(Login);
