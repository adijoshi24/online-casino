import React from "react";
import { connect } from "react-redux";
import {
  addMoneyFailure,
  addMoneySuccess,
  addMoneyDebugSuccess,
} from "../../Redux/actions/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-bootstrap";
import { ImSpades } from "react-icons/im";

class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      resultArray: [],
      disabled1: this.props.bank.amount >= 2 ? false : true,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  resultLoop = () => {
    let itemsMap = {};
    let maxValue = 0;
    let maxCount = 0;
    for (let item of this.state.resultArray) {
      // 4
      if (itemsMap[item] == null) {
        itemsMap[item] = 1;
      } else {
        itemsMap[item]++;
      }

      //5
      if (itemsMap[item] > maxCount) {
        maxValue = item;
        maxCount = itemsMap[item];
      }
    }
    console.log("maxValue", maxValue);
    console.log("maxCount", maxCount);

    // validation for the winning amount.
    this.validation(maxCount, maxValue);
  };

  validation = (a, b) => {
    console.log("a", a);
    console.log("b", b);
    //if maxCount is 2, add 0.5 to the balance
    let credit = 0;
    if (a == 2) {
      credit = 0.5;
      toast.success(`You have won $${credit}`);
    }
    //if maxCount is 3 and maxValue is 0, add 5 to the balance
    if (a == 3 && b == 0) {
      credit = 5;
      toast.success(`You have won $${credit}`);
    }
    //if maxCount is 3 and maxValue is NOT 0, add 2 to the balance
    if (a == 3 && b != 0) {
      credit = 2;
      toast.success(`You have won $${credit}`);
    }
    if (a == 0) {
      credit = 0;
      toast.failure("Better Luck Next Time!");
    }
    console.log("credit", credit);
    const payload = {
      id: this.props.bank.data.length,
      credit: credit,
      resultArray: this.state.resultArray,
      time: new Date().toLocaleString(),
    };
    this.props.dispatch(addMoneySuccess(payload));
  };

  debugSpade = () => {
    const payload = {
      id: this.props.bank.data.length,
      credit: 5,
      resultArray: [0, 0, 0],
      time: new Date().toLocaleString(),
    };
    this.props.dispatch(addMoneyDebugSuccess(payload));
    toast.success(
      <>
        <ImSpades />
        <ImSpades />
        <ImSpades />
        <span> Debug Successful! $5 added to balance.</span>
      </>
    );
  };

  selectItem = (e) => {
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      if (this.state.resultArray.length < 3) {
        this.state.resultArray.push(selectedItem);
      }
      if (this.state.resultArray.length > 3) {
        let tempArr = [];
        this.setState({ resultArray: tempArr });
      }
      if (this.state.resultArray.length == 3) {
        this.setState({ disabled1: true });
        this.resultLoop();
      }
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  };

  closeModal = () => {
    this.props.dispatch(addMoneyFailure());
  };

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    };
    const spinning = selectedItem !== null ? "spinning" : "";

    return (
      <Modal show={this.props.bank.startModal}>
        <Modal.Body>
          <div className="wheel-container">
            <div
              className={`wheel ${spinning}`}
              style={wheelVars}
              onClick={this.selectItem}
            >
              {items.map((item, index) => (
                <div
                  className="wheel-item"
                  key={index}
                  style={{ "--item-nb": index }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            {this.state.resultArray &&
              this.state.resultArray.map((item, i) => (
                <span className="fade-in">{this.props.items[item]}</span>
              ))}
          </div>
          <button
            className="spinButton"
            disabled={this.state.disabled1}
            onClick={(e) => {
              this.selectItem(e);
            }}
          >
            Spin
          </button>
          <button className="debugButton" onClick={() => this.debugSpade()}>
            Debug
          </button>
          <button className="closeButton" onClick={this.closeModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { bank: state.Bank };
};

export default connect(mapStateToProps)(Wheel);
