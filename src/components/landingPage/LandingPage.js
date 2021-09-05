import React, { Component } from "react";
import { connect } from "react-redux";
import { addMoneyRequest } from "../../Redux/actions/actions";
import BootstrapTable from "react-bootstrap-table-next";
import Header from "./Header";
import Wheel from "./Wheel";
import { ImSpades, ImClubs, ImDiamonds, ImHeart } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true,
    headerStyle: () => {
      return { width: "10%" };
    },
  },
  {
    dataField: "slot",
    text: "Slot 1-3",
  },
  {
    dataField: "time",
    text: "Time",
    sort: true,
  },
];
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [
        <ImSpades style={{ color: "black" }} />,
        <ImDiamonds style={{ color: "red" }} />,
        <ImClubs style={{ color: "black" }} />,
        <ImHeart style={{ color: "red" }} />,
      ],
      currentSort: "default",
    };
  }
  componentDidMount = () => {
    if (!this.props.user.auth) {
      this.props.history.push("/signin");
    }
  };

  startButton = () => {
    this.props.dispatch(addMoneyRequest());
  };
  render() {
    const myData = this.props.bank.data.map((item) => ({
      id: item.id,
      slot: item.resultArray.map((index) => this.state.places[index]),
      time: item.time,
    }));
    console.log("myData", myData);
    return (
      <div className="landingPage">
        <Header />
        <div className="productList container">
          {this.props.bank.startModal && <Wheel items={this.state.places} />}
          <div style={{ textAlign: "center" }}>
            Spin the wheel{" "}
            <button className="startButton" onClick={this.startButton}>
              Start
            </button>
          </div>

          <BootstrapTable
            bootstrap4
            keyField="id"
            data={myData}
            columns={columns}
            hover
            pagination={paginationFactory()}
          />
          <ToastContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.Login, bank: state.Bank };
};
export default connect(mapStateToProps)(LandingPage);
