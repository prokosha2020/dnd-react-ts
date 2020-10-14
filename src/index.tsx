import React from "react";
import ReactDOM from "react-dom";
import * as jsbox from "react-jsonbox";
// import { JsonBoxProvider } from "react-jsonbox";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <jsbox.JsonBoxProvider
    value={{
      url: "https://jsonbox.io/demobox_6d9e326c183fde7b",
      id: "prok123",
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </jsbox.JsonBoxProvider>,
  document.getElementById("root")
);
