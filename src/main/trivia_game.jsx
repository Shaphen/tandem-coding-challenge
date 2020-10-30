import React from "react";
import Questions from "../resources/trivia_questions.json";
import "./trivia_game.css";

class TriviaGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newCount = this.state.count + 1;
    this.setState({ count: newCount })
  }

  render() {
    const randomizeQuestions = Questions.sort(() => Math.random() - 0.5) // randomize copy of questions list
    const tenQuestions = randomizeQuestions.slice(9) // picks first 10 questions of randomized list
    const currQuestion = tenQuestions[this.state.count]
    const possibleAnswers = [currQuestion.correct, ...currQuestion.incorrect]
    debugger
    return(
      <div className="trivia-container">
        <p id="trivia-title">This is the trivia Game Section</p>
        <form onSubmit={ this.handleSubmit }>
          <label>
            { currQuestion.question }
          </label>
          { possibleAnswers.map(answer => (
            <li>{ answer }</li>
          ))}
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default TriviaGame;