import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "~/components/root/App";
import { setupFirebase } from "~/lib/firebase";

setupFirebase();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
