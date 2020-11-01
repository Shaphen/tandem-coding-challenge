import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";

class Welcome extends React.Component {

  render() {
    return(
      <div className="welcome-container">
        <p id="welcome-title">Welcome to Trividem!</p>
        <Link to="/trivia-game">Start Trivia</Link>
      </div>
    )
  }
  
}

export default Welcome;