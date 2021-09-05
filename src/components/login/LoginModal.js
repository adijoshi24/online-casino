import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Image, Modal } from "react-bootstrap";
import {
  signinFailure,
  signinSuccess,
  signinModalClose,
} from "../../Redux/actions/actions";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyImg =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: dummyImg,
      imgErrMsg: null,
    };
    this.myRef = React.createRef();
  }
  componentDidMount = () => {
    if (this.props.user.auth) {
      this.props.history.push("/");
    }
  };

  loginSubmit = (event) => {
    event.preventDefault();
    console.log("event", event);
    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
      image: this.state.imageUrl,
    };
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email == "admin@admin.com" && password == "admin") {
      toast.info("Login Successful!");
      this.props.dispatch(signinSuccess(user));
      this.props.history.push("/");
      event.target.email.value = "";
      event.target.password.value = "";
    } else if (email == "admin@admin.com" && password != "admin") {
      this.props.dispatch(signinFailure());
      toast.error("Invalid Credentials!");
      event.target.email.value = "";
      event.target.password.value = "";
    } else {
      toast.error("User not registered!");
    }
  };

  _fileUpload = (file) => {
    let size = file.size / 1024 / 1024;
    let type = file.type;
    if (type == "image/jpeg" || type == "image/png" || type == "image/jpg") {
      if (size <= 10) {
        const reader = new FileReader();

        reader.onloadend = () => {
          this.setState({
            imageUrl: reader.result,
          });
        };
        if (file) {
          reader.readAsDataURL(file);
          this.setState({
            imageUrl: reader.result,
            imgErrMsg: "",
            showError: false,
          });
        } else {
          this.setState({
            imageUrl: dummyImg,
            imgErrMsg: "",
            showError: false,
          });
        }
      } else {
        this.setState({
          imageUrl: dummyImg,
          imgErrMsg: "Please select image of less than 10MB in size.",
          showError: true,
        });
      }
    } else {
      this.setState({
        imageUrl: dummyImg,
        imgErrMsg: "Please select image of .png, .jpg, .jpeg type.",
        showError: true,
      });
    }
  };

  _onChange = (e) => {
    const file = this.refs.uploadImg.files[0];
    if (file) {
      this._fileUpload(file);
      this.setState({
        file: file,
      });
    } else if (!file) {
      this._fileUpload(this.state.file);
    }
  };
  render() {
    console.log("this.state", this.state);
    return (
      <Modal show={this.props.user.loginModal}>
        <div className="container app-container">
          <Form onSubmit={this.loginSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Image
                src={this.state.imageUrl ? this.state.imageUrl : dummyImg}
                ref="uploadImg"
                style={{ width: "97px", height: "97px" }}
              />
              <div style={{ display: "flex" }}>
                <Form.Control
                  ref="uploadImg"
                  type="file"
                  style={{ height: "36px" }}
                  onChange={this._onChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email"
                className="input"
                name="email"
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="input"
                name="password"
                required
              />
            </Form.Group>

            <button className="loginSubmit" type="submit">
              Login
            </button>
          </Form>
          <button
            className="closeModal"
            onClick={() => this.props.dispatch(signinModalClose())}
          >
            Close
          </button>
        </div>
        <ToastContainer />
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.Login };
};

export default withRouter(connect(mapStateToProps)(Login));
