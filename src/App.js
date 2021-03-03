import './App.css';
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";

import Welcome from "./Screens/Welcome";
import Demographics from "./Screens/demographics";
import Personality from "./Screens/personality";
import Questionnaire from "./Screens/questionnaire"
import Profile from "./Screens/profile"
import Error from "./Screens/error"


export default function App() {
	return (
    <Router>
      <Switch>
	      <Route path="/Error" component={Error}/>
		  <Route path="/Demographics" component={Demographics}/>
		  <Route path="/Personality" component={Personality}/>

		  <Route path="/Profile" component={Profile}/>
	      <Route path="/Questionnaire" component={Questionnaire}/>
	      <Route path="/" component={Welcome}/>

      </Switch>
    </Router>
	);
}

