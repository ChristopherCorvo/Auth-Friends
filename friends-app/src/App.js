import './App.css';

import React from 'react'

import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

//-------- import components ---------
import LoginForm from './components/LoginForm'
import Friends from './components/Friends'
import FriendForm from './components/FriendForm'
import PrivateRoute from './components/PrivateRoute'

function App() {

  
  return (
    <Router>
      <div>
        <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/protected">Friends List</Link>
            </li>
          </ul>
          <Switch>
            {/* Protected route */}
            <PrivateRoute  exact path="/protected" component={Friends} />
            <PrivateRoute exact path='/friendform' component={FriendForm}/>
            <Route path="/login" component={LoginForm} />
            {/* <Route component={LoginForm} /> */}
          </Switch>
      </div>
    </Router>
  );
}

export default App;
