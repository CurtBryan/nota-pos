import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Logo from "../Logo/Logo";
import { setEmployees } from "../../ducks/restaurantReducer";
import { setUser } from "../../ducks/userReducer";
import "./Login.css";
import EmpLogin from "../EmpLogin/EmpLogin";


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

  loginAccount = () => {
    const { typedEmail, typedPassword } = this.state;
    // Add post endpoint for account login
    //  console.log(this.state)
    axios
      .post("/api/login", { typedEmail, typedPassword })
      .then(res => {
        this.props.setUser(res.data);
        console.log();
      })
      .catch(err => console.log("LOGIN", err));
  };

  render() {
    const { user } = this.props.userInfo;

  //   if (!this.props.setEmployees) {
  //     return <></>;
  // }
    return (
      <div className="form-container">
          <Logo />
        <div className="form">
          <p className="title-pos">NotaPOS</p>
          <div className="info-card">
         
          {!user ? (
            <div>
            <div className="form-login" >
            <input className="login"
              placeholder="Email"
              onChange={e => this.loginEmailHandler(e.target.value)}
              type="text"
              value={this.typedEmail}
              name="typedEmail"
            />

            <input  className="login"
              placeholder="Password"
              onChange={e => this.loginPasswordHandler(e.target.value)}
              type="text"
              value={this.typedPassword}
              name="typedPassword"
            />
            </div>
           

              <button className="account-btn" onClick={this.loginAccount}>
                Submit
              </button>
         
              </div>
            ) : (
              <EmpLogin />
            )}
          </div>

          <Link to="/register" style={{ textDecoration: "none" }}>
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
  setUser,
  setEmployees
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
