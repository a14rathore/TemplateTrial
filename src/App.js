import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import AuthContextProvider from "./Context/AuthContextProvider";
import { Store, persistor } from "./Redux/Store";
import Approuter from "./Router";

function App() {
  return (
    <div className="mainBody">
      <Provider store={Store}>
        <AuthContextProvider>
          <PersistGate persistor={persistor}>
            <Approuter />
          </PersistGate>
        </AuthContextProvider>
      </Provider>
    </div>
  );
}

export default App;
