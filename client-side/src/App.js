import Main from './Main'
import Holiday from './Holiday'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/h" component={Holiday} />
            </Switch>
        </Router>
        )
}

export default App;
