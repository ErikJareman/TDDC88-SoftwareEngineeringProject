import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Patient from './Pages/Patient/Patient'
import Login from './Pages/Login/Login'
import 'semantic-ui-css/semantic.min.css'
import Start from './Pages/Start/Start'

export default function App () {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/patient" component={Patient} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/" component={Start} />
        </Switch>
      </div>
    </Router>
  )
}
