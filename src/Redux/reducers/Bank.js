const initialState = {
  data: [],
  amount: 9.99,
  startModal: false,
};

const Bank = (state = initialState, action, props) => {
  switch (action.type) {
    case "ADD_MONEY_REQUEST":
      console.log("ADD_MONEY_REQUEST action", action);
      console.log("ADD_MONEY_REQUEST state", state);
      return {
        ...state,
        startModal: true,
      };
    case "ADD_MONEY_SUCCESS":
      console.log("ADD_MONEY_SUCCESS action", action);
      console.log("ADD_MONEY_SUCCESS state", state);
      return {
        ...state,
        data: [
          ...state.data,
          {
            id: action.bank.id + 1,
            time: action.bank.time,
            resultArray: action.bank.resultArray,
          },
        ],
        startModal: true,
        amount: state.amount + action.bank.credit - 2,
      };
    case "ADD_MONEY_FAILURE":
      return {
        ...state,
        startModal: false,
      };
    case "ADD_MONEY_DEBUG_SUCCESS":
      return {
        ...state,
        data: [
          ...state.data,
          {
            id: action.bank.id + 1,
            time: action.bank.time,
            resultArray: action.bank.resultArray,
          },
        ],
        startModal: true,
        amount: state.amount + 5 - 2,
      };
    default:
      return state;
  }
};

export default Bank;
