'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import fastclick from 'fastclick';
import debug from 'debug';

import Counter from './Counter';

let mount = document.querySelector('#mount');

new fastclick(mount);

const log = debug('sotm:app');
const App = React.createClass({

  getInitialState() {
    return {
      mode: 'numbers',
      ones: 0,
      tens: 0,
    }
  },

  componentDidMount() {
    let prev = window.localStorage.getItem('sotm_counter');
    if (prev) {
      log('setting previous state', prev);
      this.setState(JSON.parse(prev));
    }
  },

  handleUpdate(newState) {
    this.setState(newState);
    window.localStorage.setItem('sotm_counter', JSON.stringify(newState));
  },

  render() {
    return <div className='full-height flex flex-column'>
      <nav className='p2'>
        <p className='p0 m0'>
          <span className='mr2'>Sentinels of the Multiverse Counter</span>
          <span className='fa fa-arrow-right'></span>
        </p>
      </nav>
      {
        this.state.mode === 'numbers'
        ? <Counter
            ones={this.state.ones}
            tens={this.state.tens}
            onUpdate={this.handleUpdate}
          />
        : null
      }
    </div>
  }
})

ReactDOM.render(<App />, mount);
