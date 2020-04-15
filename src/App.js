import React from 'react';
import { Router } from "@reach/router"
import Home from './Home';
import Charts from './Charts';
import Soon from './Soon';
import './App.css';

const App = () => {
  return (
      <Router>
        <Home path="/" />
        <Charts path="/chart" />
        <Soon path="/soon"/>
      </Router>
  )
}

export default App;
