import "./App.css";
import Cat from "./Cat";
import Subcat from "./Subcat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Cat}></Route>
          <Route path="/:id" component={Subcat}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
