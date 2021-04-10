import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home'
import Favorites from './components/favorites'

function App() {
    return (
        <div className="App">
            <Router>
                <Route exact path='/' component={Home} />
                <Route path='/favorites' component={Favorites} />
            </Router>
        </div>
    );
}

export default App;
