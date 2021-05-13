import Main from './Main'
import Table from './Table'
import News from './News'
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
                <Route exact path="/news" component={News} />
                <Route exact path="/holidays" component={Holiday} />
            </Switch>
        </Router>
        )
}

export default App;
