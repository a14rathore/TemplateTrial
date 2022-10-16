import { Action } from "./Action";

const intialValue = {
  user: {},
  isLogged: false,
  servicePageid: { id: "", name: "", date: "" },
  listCardDetail: { id: "", CompairSchema: {} },
};

function Reducer(state = intialValue, action) {
  switch (action.type) {
    case Action.AUTH:
      return {
        ...state,
        isLogged: true,
        user: action.data,
      };
    case Action.LOGOUT:
      return {
        ...state,
        isLogged: false,
        user: {},
      };
    case Action.SERVICEPAGE:
      return {
        ...state,
        servicePageid: action?.data,
      };
    case Action.LISTCARDDETAIL:
      return {
        ...state,
        listCardDetail: {
          id: action?.data?.id,
          CompairSchema: action?.data?.CompairSchema,
        },
      };

    default:
      return state;
  }
}

export default Reducer;
