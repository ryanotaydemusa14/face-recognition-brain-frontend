import React from "react";
import "./Navigation.css";
import rom from "./rom.png";
import Tilt from "react-parallax-tilt";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <div className="nav">
        <div className="logo">
          <Tilt>
            <div className="logo">
              <img src={rom} alt="rom" />
            </div>
          </Tilt>
        </div>
        <div className="space"></div>
        <p
          onClick={() => onRouteChange("signout")}
          className="signout b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
        >
          SIGN OUT
        </p>
      </div>
    );
  } else {
    return (
      <div className="nav">
        <div className="logo">
          <Tilt>
            <div className="logo">
              <img src={rom} alt="rom" />
            </div>
          </Tilt>
        </div>
        <div className="space"></div>
        <div className="options">
          <p
            onClick={() => onRouteChange("signin")}
            className="signout b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          >
            SignIn
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="signout b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          >
            Register
          </p>
        </div>
      </div>
    );
  }
};

export default Navigation;
