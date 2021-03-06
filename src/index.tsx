import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { ToastProvider } from "react-toast-notifications"
import reportWebVitals from "./reportWebVitals";
import { Provider as UserProvider } from "./context/userStore";
import { Provider as CreateIdProvider } from "./context/createIdStore";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
    <UserProvider>
      <CreateIdProvider>
        <App />
      </CreateIdProvider>
    </UserProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
