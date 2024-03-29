import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "../utils/appStore.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provider from redux store to wrap our app component so the store will be stablished globally */}
    <Provider store={appStore}>
      {/* App component */}
      <App />
    </Provider>
  </React.StrictMode>
);
