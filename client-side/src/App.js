import Main from './Main'
import Table from './Table'
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
                <Route exact path="/test" component={Table}/>
            </Switch>
        </Router>
        )
}

export default App;
