const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const signinRequest = (user) => ({
  type: SIGNIN_REQUEST,
  user,
});
const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const signinSuccess = (user) => ({
  type: SIGNIN_SUCCESS,
  user,
});
const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const signinFailure = () => ({
  type: SIGNIN_FAILURE,
  auth: false,
  guestLogin: false,
});
const SIGNIN_MODAL_CLOSE = "SIGNIN_MODAL_CLOSE";
export const signinModalClose = () => ({
  type: SIGNIN_MODAL_CLOSE,
  auth: false,
  guestLogin: false,
});

const SIGNIN_SUCCESS_GUEST = "SIGNIN_SUCCESS_GUEST";
export const signinSuccessGuest = (user) => ({
  type: SIGNIN_SUCCESS_GUEST,
  user,
});

const LOGOUT = "LOGOUT";
export const logout = () => ({
  type: LOGOUT,
});

const ADD_MONEY_REQUEST = "ADD_MONEY_REQUEST";
export const addMoneyRequest = () => ({
  type: ADD_MONEY_REQUEST,
  startModal: false,
});
const ADD_MONEY_SUCCESS = "ADD_MONEY_SUCCESS";
export const addMoneySuccess = (bank, formData) => ({
  type: ADD_MONEY_SUCCESS,
  bank,
  startModal: false,
});
const ADD_MONEY_FAILURE = "ADD_MONEY_FAILURE";
export const addMoneyFailure = () => ({
  type: ADD_MONEY_FAILURE,
  startModal: false,
});
const ADD_MONEY_DEBUG_SUCCESS = "ADD_MONEY_DEBUG_SUCCESS";
export const addMoneyDebugSuccess = (bank, formData) => ({
  type: ADD_MONEY_DEBUG_SUCCESS,
  bank,
  startModal: false,
});
