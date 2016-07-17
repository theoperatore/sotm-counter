'use strict';

import React from 'react';
import debug from 'debug';

const log = debug('counter');

export default React.createClass({
  displayName: 'Counter',


  getInitialState() {
    return {
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


  saveState(state) {
    log('saving current state', state);
    window.localStorage.setItem('sotm_counter', JSON.stringify(state));
  },


  increment(digit) {
    log(`increment ${digit}`);
    let num = this.state[digit] + 1;

    let newState = {
      ones: this.state.ones,
      tens: this.state.tens
    }

    newState[digit] = num;

    if (digit === 'ones' && num > 9) {
      newState.tens += 1;
      newState.ones = 0;
    }

    this.setState(newState);
    this.saveState(newState);
  },


  decrement(digit) {
    log(`decrement ${digit}`);
    let num = this.state[digit] - 1;

    let newState = {
      ones: this.state.ones,
      tens: this.state.tens
    }

    newState[digit] = num;

    if (digit === 'ones' && num < 0) {
      newState.tens -= 1;
      newState.ones = 9;
    }

    newState.tens = newState.tens < 0 ? 0 : newState.tens;

    this.setState(newState);
    this.saveState(newState);
  },


  render() {
    return (
      <section>
        <div className='row'>
          <div className='col'><button className='right' onClick={this.increment.bind(this, 'tens')}>+</button></div>
          <div className='col'><button className='left' onClick={this.increment.bind(this, 'ones')}>+</button></div>
        </div>
        <div className='row'>
          <div className='col'><p>{this.state.tens}</p></div>
          <div className='col'><p>{this.state.ones}</p></div>
        </div>
        <div className='row'>
          <div className='col'><button className='right'onClick={this.decrement.bind(this, 'tens')}>-</button></div>
          <div className='col'><button className='left' onClick={this.decrement.bind(this, 'ones')}>-</button></div>
        </div>
      </section>
    );
  }
})
