import { createStore, combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Reducer from "./reducer";
import TokenReducer from "./TokenReducer";

const AllReducers = {
  app: Reducer,
  token: TokenReducer,
};

const PersisterConfig = {
  key: "root",
  storage,
  whitelist: ["app", "token"],
};

const RootReducer = combineReducers(AllReducers);

const persistedReduecer = persistReducer(PersisterConfig, RootReducer);

export const Store = createStore(persistedReduecer);
export const persistor = persistStore(Store);
