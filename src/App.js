import React, { Component } from 'react';
import Header from './components/Header/Header';
import Sentences from './components/Sentences/Sentences';

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Sentences />
      </div>
    );
  }
}

export default App;
