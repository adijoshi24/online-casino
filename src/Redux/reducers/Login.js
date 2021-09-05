const initialState = {};
const Login = (state = initialState, action, props) => {
  switch (action.type) {
    case "SIGNIN_REQUEST":
      return {
        ...state,
        loginModal: true,
        auth: false,
        guestLogin: false,
      };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        name: action.user.name,
        image: action.user.image,
        email: action.user.email,
        password: action.user.password,
        guestLogin: false,
        loginModal: false,
        auth: true,
      };
    case "SIGNIN_FAILURE":
      return {
        ...state,
        loginModal: true,
        auth: false,
        guestLogin: false,
      };
    case "SIGNIN_MODAL_CLOSE":
      return {
        state: initialState,
      };
    case "SIGNIN_SUCCESS_GUEST":
      return {
        ...state,
        guestLogin: true,
        auth: true,
      };
    case "LOGOUT":
      return {
        state: initialState,
      };
    default:
      return state;
  }
};

export default Login;
