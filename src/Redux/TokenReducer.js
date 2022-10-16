import { Action } from "./Action";

const initialValue = {
  token: "",
};

const TokenReducer = (state = initialValue, action) => {
  switch (action.type) {
    case Action.USERTOKEN: {
      console.log(action);
      return {
        ...state,
        token: action.data,
      };
    }
    default:
      return state;
  }
};

export default TokenReducer;
