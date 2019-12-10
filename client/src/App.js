import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import Home from './components/Home/Home.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import Detail from './components/Detail/Detail.jsx';
import Create from './components/Create/Create.jsx';
import Basic from './components/Basic/Basic.jsx';
import Log from './components/Log/Log.jsx';
import Rec from './components/Recommendations/Recommendations.jsx';
import Trends from './components/Trends/Trends.jsx';

require('./styles/main.scss');

export default class App extends Component {
  render() {
    return (
      <div className="nav">
        <Router>
          <div>
            <h1><Link to="/" className="links">MOVIFY</Link> </h1>
            <h2>
              <Link to="/" className="links">SEARCH</Link>
              <Link to="/gallery" className="links">GALLERY</Link>
              <Link to="/create" className="links">CREATE-UPDATE-DELETE</Link>
              <Link to="/basic" className="links">BASIC-QUERIES</Link>
              <Link to="/log" className="links">LOG</Link>
              <Link to="/rec" className="links">RECOMMENDATIONS</Link>
              <Link to="/trends" className="links">TRENDS</Link>
            </h2>
          </div>
        </Router>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />,
            <Route exact path='/gallery' component={Gallery} />,
            <Route exact path='/detail' component={Detail} />
            <Route exact path='/create' component={Create} />
            <Route exact path='/basic' component={Basic} />
            <Route exact path='/log' component={Log} />
            <Route exact path='/rec' component={Rec} />
            <Route exact path='/trends' component={Trends} />
          </Switch>
        </Router>
      </div>
    );
  }
}