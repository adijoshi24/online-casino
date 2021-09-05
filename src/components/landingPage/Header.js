import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../main-logo.svg";
import { Image } from "react-bootstrap";
import { logout, signinRequest } from "../../Redux/actions/actions";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

const dummyImg =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E";

class Header extends Component {
  logout = () => {
    toast.success("Logged out Successfully!");
    this.props.dispatch(logout());
    this.props.history.push("/signin");
  };
  render() {
    return (
      <div className="header">
        <img
          src={Logo}
          style={{
            marginLeft: "20px",
          }}
          className="logoImage"
        />
        <div>
          <b>Balance: ${this.props.bank.amount.toFixed(2)}</b>
          <Image
            src={this.props.user.image ? this.props.user.image : dummyImg}
            roundedCircle
            style={{
              width: "60px",
              height: "60px",
              border: "2px solid #988e8e",
              marginLeft: "10px",
            }}
          />
          {this.props.user.guestLogin ? (
            <button
              className="loginButton"
              onClick={() => {
                // this.props.dispatch(logout());
                this.props.history.push("/signin");
                this.props.dispatch(signinRequest());
              }}
              style={{ marginLeft: "15px", marginRight: "20px" }}
            >
              Signin
            </button>
          ) : (
            <button
              className="logoutButton"
              onClick={this.logout}
              style={{ marginLeft: "15px", marginRight: "20px" }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.Login, bank: state.Bank };
};
export default withRouter(connect(mapStateToProps)(Header));
