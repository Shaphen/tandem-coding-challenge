import React from "react";
import Modal from "react-modal";
import Questions from "../resources/trivia_questions.json";
import "./trivia_game.css";

class TriviaGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      randomQuestions: null,
      currAnswer: "",
      count: 0,
      score: 0,
      showResultModal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleCloseResultModal = this.handleCloseResultModal.bind(this);
  }

  componentDidMount() {
    const questions = Questions.sort(() => Math.random() - 0.5) // randomize copy of questions list;
    questions.map(q => {
      let answers = [q.correct, ...q.incorrect]
      let mixed = answers.sort(() => Math.random() - 0.5)
      return q.allPossibleAnswers = mixed
    })
    this.setState({ randomQuestions: questions })
  }

  // handleCloseResultModal(e) {
  //   e.stopPropagation();
  //   this.setState({ showResultModal: false })
  // }

  handleSubmit(e, question) {
    e.preventDefault();
    const newCount = this.state.count + 1; // increment number of questions asked in state every time
    if (question.correct === this.state.currAnswer) { // for correct answer display correct and increment score
      document.getElementById("answer-result").innerHTML = "Correct!"
      const incrementedScore = this.state.score + 1;
      this.setState({ score: incrementedScore })
    } else { // for incorrect answer
      document.getElementById("answer-result").innerHTML = "Incorrect! The answer was " + question.correct
    }
    setTimeout(() => { // only show current result for a few seconds
      document.getElementById("answer-result").innerHTML = "" // clear text for result
      this.setState({ count: newCount }) // change state at end
      if (this.state.count === 9) { // show final results modal with score if 10 questions are asked
      this.setState({ showResultModal: true })
      }
    }, 3000);
  }

  handleChange(type) {
    return e => {
      this.setState({ [type]: e.target.id })
    }
  }

  render() {
    const questions = this.state.randomQuestions
    const currQuestion = questions ? questions[this.state.count] : null
    const possibleAnswers = currQuestion ? currQuestion.allPossibleAnswers : null
    // const possibleAnswers = currQuestion ? [currQuestion.correct, ...currQuestion.incorrect] : null
    // const mixedAnswers = possibleAnswers ? possibleAnswers.sort(() => Math.random() - 0.5) : null
    return(
      <div className="trivia-container">
        <p id="trivia-title">This is the trivia Game Section</p>
        <form onSubmit={ e => this.handleSubmit(e, currQuestion) }>
          <label>
            { currQuestion ? currQuestion.question : null }
          </label>
          <fieldset onChange={this.handleChange("currAnswer")}>
          { possibleAnswers ? possibleAnswers.map((answer, idx) => (
            <div key={ idx }>
              <input type="radio" key={ idx } id={ answer } name="option" />
              <label htmlFor={ answer } key={ idx + 1 }>{ answer }</label>
            </div>
          )) : null }
          </fieldset>
          <button>Submit</button>
        </form>
        <label id="answer-result"></label>
        <Modal
              id="create-channel-modal"
              isOpen={this.state.showResultModal}
              contentLabel="Delete Server Modal"
              // onRequestClose={this.handleCloseResultModal}
              style={{
                content: {
                  top: '50%',
                  left: '50%',
                  right: '0',
                  bottom: '0',
                  marginLeft: "-245px",
                  marginTop: "-175px",
                  overflow: "hidden",
                  marginTop: "-170px",
                  width: "440px",
                  height: "255px",
                  backgroundColor: "#36393f",
                  border: "none",
                  color: "white"
                },
                overlay: {
                  position: 'fixed',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  zIndex: '50'
                }}}
            >
              <div>
                <p>FINAL SCORE:</p>
                <label>{ this.state.score }/10</label>
              </div>
            </Modal>
      </div>
    )
  }
}

export default TriviaGame;