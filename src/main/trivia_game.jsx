import React from "react";
import "./trivia_game.css";

class TriviaGame extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="trivia-container">
        <p id="trivia-title">This is the trivia Game Section</p>
      </div>
    )
  }
}

export default TriviaGame;