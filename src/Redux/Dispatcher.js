import { Action } from "./Action";
import { Store } from "./Store";

export const Dispatcher = {
  login: (data) => {
    Store.dispatch({ type: Action.AUTH, data: data });
  },
  logout: () => {
    Store.dispatch({ type: Action.LOGOUT });
  },
  SetServicePageId: (data) => {
    Store.dispatch({ type: Action.SERVICEPAGE, data: data });
  },
  SetUserToken: (data) => {
    Store.dispatch({ type: Action.USERTOKEN, data: data });
  },
  SetListCardId: (data) => {
    Store.dispatch({ type: Action.LISTCARDDETAIL, data: data });
  },
};
