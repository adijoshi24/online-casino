import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Logo from "../../main-logo.svg";
import Modal from "./LoginModal";
import { signinRequest, signinSuccessGuest } from "../../Redux/actions/actions";

class Login extends Component {
  loginEmail = () => {
    this.props.dispatch(signinRequest());
  };
  loginGuest = () => {
    this.props.dispatch(signinSuccessGuest());
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="mainContainer">
        <img className="imgUpload" src={Logo} />
        <br />
        <button className="emailLogin" onClick={() => this.loginEmail()}>
          Login with Email
        </button>
        <br />
        <button className="guestLogin" onClick={() => this.loginGuest()}>
          Login as a guest
        </button>
        <br />
        <Modal />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.Login };
};
export default withRouter(connect(mapStateToProps)(Login));
