import React from 'react';
import ReactDOM from 'react-dom';
import Attraction from './components/Attraction';
import './styles/styles.css';

const App = () => (
  <Attraction />
);

ReactDOM.render(<App />, document.getElementById('app'));
