import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

const Index = () => {
  return (
    <div className="full-screen">
      <div>
        <h1>
          React Page {" "}
        </h1>
        <br />
        <a
          className="button-line"
          href="https://github.com/deityhub"
          target="_blank"
        >
          Know more
        </a>
      </div>
    </div>
  );
};

export default Index;
ReactDOM.render(<App />, document.getElementById("app"));