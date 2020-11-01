import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";

class Welcome extends React.Component {

  render() {
    return(
      <div className="welcome-container">
        <div id="welcome-box">
          <p id="welcome-title">Welcome to Trividem!</p>
          <Link to="/trivia-game" id="start-game">START TRIVIA</Link>
        </div>
      </div>
    )
  }

}

export default Welcome;