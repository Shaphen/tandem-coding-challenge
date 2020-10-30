import { HashRouter, Route, Switch } from "react-router-dom";
import Welcome from "./main/welcome.jsx";
import TriviaGame from "./main/trivia_game.jsx";
import "./app.css";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/trivia-game" component={TriviaGame} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
