import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landingpage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import Create from './components/Create/create'
import Detail from './components/Details/Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landingpage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/home/:id' element={<Detail/>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;