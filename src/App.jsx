import { HashRouter, Route, Switch } from "react-router-dom";
import Welcome from "./main/welcome.jsx";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
