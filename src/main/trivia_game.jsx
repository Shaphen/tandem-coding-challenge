import React from "react";
import Modal from "react-modal";
import Questions from "../resources/trivia_questions.json";
import "./trivia_game.css";

class TriviaGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currAnswer: "",
      count: 0,
      score: 0,
      showResultModal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleCloseResultModal = this.handleCloseResultModal.bind(this);
  }

  // handleCloseResultModal(e) {
  //   e.stopPropagation();
  //   this.setState({ showResultModal: false })
  // }

  handleSubmit(e, question) {
    e.preventDefault();
    debugger
    if (this.state.count === 10) {
      this.setState({ showResultModal: true })
    } else {
      const newCount = this.state.count + 1;
      this.setState({ count: newCount })
    }
  }

  handleChange(type) {
    return e => {
      debugger
      this.setState({ [type]: e.target.answer })
    }
  }

  render() {
    const randomizeQuestions = Questions.sort(() => Math.random() - 0.5) // randomize copy of questions list
    const tenQuestions = randomizeQuestions.slice(9) // picks first 10 questions of randomized list
    const currQuestion = tenQuestions[this.state.count]
    const possibleAnswers = [currQuestion.correct, ...currQuestion.incorrect]
    return(
      <div className="trivia-container">
        <p id="trivia-title">This is the trivia Game Section</p>
        <form onSubmit={ e => this.handleSubmit(e, currQuestion) }>
          <label>
            { currQuestion.question }
          </label>
          <fieldset onChange={this.handleChange("currAnswer")}>
          { possibleAnswers.map((answer, idx) => (
            <div key={ idx }>
              <input type="radio" answer={ answer } key={ idx } id={ idx } name="option" />
              <label htmlFor={ idx } key={ idx + 1 }>{ answer }</label>
            </div>
          ))}
          </fieldset>
          <button>Submit</button>
        </form>
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