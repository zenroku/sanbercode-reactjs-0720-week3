import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import TableComp from './tugas11/TableComp'
import TimerLifeCycle from './tugas12/TimerLifeCycle'
import CrudTable from './tugas13/CrudTable'
// import RestAPI from './tugas14/RestAPI'
import ContextConsumer from './tugas15/ContextConsumer'


function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <ul>
            <li><Link to='/'>Landing Page</Link></li>
            <li><Link to='/tugas11'>Tugas 11</Link></li>
            <li><Link to='/tugas12'>Tugas 12</Link></li>
            <li><Link to='/tugas13'>Tugas 13</Link></li>
          </ul>
        </div>
        <Switch>
          <Route path='/tugas11'>
            <TableComp />
          </Route>
          <Route path='/tugas12'>
            <TimerLifeCycle />
          </Route>
          <Route path='/tugas13'>
            <CrudTable />
          </Route>
          <Route path='/'>
            {/* <RestAPI /> */}
            <ContextConsumer />
          </Route>
        </Switch>
      </Router>
      {/* tugas 15 below */}

    </div>
  );
}

export default App;
