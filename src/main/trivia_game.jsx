import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Questions from "../resources/trivia_questions.json";
import "./trivia_game.css";

class TriviaGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      randomQuestions: null, // will be populated with questions in componentDidMount
      currAnswer: "", // populated in handleChange when selecting possible answers for question
      count: 0, // incremented to track currect question
      score: 0,
      showResultModal: false,
      disableSubmitButton: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const questions = Questions.sort(() => Math.random() - 0.5) // randomize copy of questions list;
    
    questions.map(q => { // merging and rearranging order of incorrect answers with correct answer
      const answers = [q.correct, ...q.incorrect]
      const mixed = answers.sort(() => Math.random() - 0.5)
      return q.allPossibleAnswers = mixed
      
    })
    this.setState({ randomQuestions: questions })
  }

  handleSubmit(e, question) {
    e.preventDefault();
    this.setState({ disableSubmitButton: true }) // disabled submit button while results show
    const newCount = this.state.count + 1; // increment number of questions asked in state every time
    
    if (question.correct === this.state.currAnswer) { // display correct and increment score
      document.getElementById("answer-result").innerHTML = "Correct!"
      const incrementedScore = this.state.score + 1;
      this.setState({ score: incrementedScore })
    } else { // display incorrect answer prompt
      document.getElementById("answer-result").innerHTML = "Incorrect! The answer was " + question.correct
    }
    
    setTimeout(() => {
      document.getElementById("answer-result").innerHTML = "" // clear text for result
      this.setState({ count: newCount, disabled: false }) // change state at end

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
    
    return(
      <div className="trivia-container">
        <p id="trivia-title">This is the trivia Game Section</p>

        {/* trivia game section */}
        <form onSubmit={ e => this.handleSubmit(e, currQuestion) }>
          <label>
            { currQuestion ? currQuestion.question : null } {/* display currect question */}
          </label>
          <fieldset onChange={this.handleChange("currAnswer")}> {/* display selection of answers */}
          { possibleAnswers ? possibleAnswers.map((answer, idx) => (
            <div key={ idx }>
              <input type="radio" key={ idx } id={ answer } name="option" />
              <label htmlFor={ answer } key={ idx + 1 }>{ answer }</label>
            </div>
          )) : null }
          </fieldset>
          <button disabled={ this.state.disableSubmitButton }>Submit</button> {/* submit answer */}
        </form>

        {/* shows if current answer was correct or incorrect */}
        <label id="answer-result"></label>

        {/* Modal to show results at end */}
        <Modal
              id="create-channel-modal"
              isOpen={this.state.showResultModal}
              contentLabel="Delete Server Modal"
              style={{
                content: {
                  top: '50%',
                  left: '50%',
                  right: '0',
                  bottom: '0',
                  marginLeft: "-245px",
                  marginTop: "-175px",
                  overflow: "hidden",
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
                <Link to="/">Reset Game</Link>
              </div>
            </Modal>
      </div>
    )
  }
}

export default TriviaGame;