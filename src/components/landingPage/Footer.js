import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        Copyright @ Paktolus {new Date().getFullYear()}
      </div>
    );
  }
}
export default Footer;
