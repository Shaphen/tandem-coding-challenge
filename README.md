## Tandem Challenge Notes (README):
Here you will find information on various decisions I made throughout the process of creating this small trivia game. Below are a few pictures and gifs for your reference along with instructiosn for running the software on your local server:

### How To Run Software
* download ZIP and extract files in desired location
* open a terminal and navigate to file directory
* run `npm install`
* run `npm start`
* a window should automatically open in your browser. If not, try entering `http://localhost:3000/` in a new tab.

### Main Page
![first-load](https://github.com/Shaphen/tandem-coding-challenge/blob/master/src/resources/welcome-page.png)

### Navigation
![navigation](https://github.com/Shaphen/tandem-coding-challenge/blob/master/src/resources/trividem.gif)

### Results Modal
![results](https://github.com/Shaphen/tandem-coding-challenge/blob/master/src/resources/results_modal.png)

### Design Decisions

#### Sorting Logic In `componentDidMount`
```javascript
componentDidMount() {
  const questions = Questions.sort(() => Math.random() - 0.5) // randomize copy of questions list;
    
  questions.map(q => { // merging and rearranging order of incorrect answers with correct answer
    const answers = [q.correct, ...q.incorrect]
    const mixed = answers.sort(() => Math.random() - 0.5)
    return q.allPossibleAnswers = mixed
      
  })
  this.setState({ randomQuestions: questions })
}
```
I decided to put my data manipulation logic in my `componentDidMount` to keep things relatively simple due to this being a small program. Normally I would put this logic either in a container or abstract it out completely into a `selectors.js` file in a reducers directory.

#### Displaying Current Results Upon Submission and Redirect to Next
```javascript
if (question.correct === this.state.currAnswer) { // display correct and increment score
  let answerResult1 = document.getElementById("answer-result")
  answerResult1.innerHTML = "Correct!"
  const incrementedScore = this.state.score + 1;
  this.setState({ score: incrementedScore })
} else { // display incorrect answer prompt
  let answerResult2 = document.getElementById("answer-result")
  answerResult2.innerHTML = "Incorrect! The answer was " + question.correct
}

setTimeout(() => {
  document.getElementById("answer-result").innerHTML = "" // clear text for result
  this.setState({ count: newCount, disableSubmitButton: false, currAnswer: "" }) // change state at end

  . . .

}, 3000);
```
I decided to only display whether submitted answer was correct or incorrect after the user clicks the `Submit` button. I then disable the submit button temporarily and display the result for 3 seconds before automatically moving to the next question. There were many ways to implment the results of the current questions but personally thought that creating a hybrid of both manual and automated progressions would be best. If this were flashcards I would keep the correct answer displayed until the user decided to move on but for trivia I found this current method appropriate.
