'use strict';

import React from 'react';
import debug from 'debug';

const log = debug('sotm:counter');

export default React.createClass({
  displayName: 'Counter',


  propTypes: {
    ones: React.PropTypes.number,
    tens: React.PropTypes.number,
    onUpdate: React.PropTypes.func.isRequired,
  },


  getDefaultProps() {
    return {
      ones: 0,
      tens: 0,
    }
  },


  increment(digit) {
    let num = this.props[digit] + 1;

    let newState = {
      ones: this.props.ones,
      tens: this.props.tens
    }

    newState[digit] = num;

    if (digit === 'ones' && num > 9) {
      newState.tens += 1;
      newState.ones = 0;
    }

    log('increment %s: %o', digit, newState);
    this.props.onUpdate(newState);
  },


  decrement(digit) {
    let num = this.props[digit] - 1;

    let newState = {
      ones: this.props.ones,
      tens: this.props.tens
    }

    newState[digit] = num;

    if (digit === 'ones' && num < 0) {
      newState.tens -= 1;
      newState.ones = 9;
    }

    newState.tens = newState.tens < 0 ? 0 : newState.tens;

    log('decrement %s: %o', digit, newState);
    this.props.onUpdate(newState);
  },


  render() {
    return (
      <section className='full-height flex flex-wrap center'>
        <button className='col-6' onClick={this.increment.bind(this, 'tens')}>
          <span className='fa fa-arrow-up'></span>
        </button>
        <button className='col-6' onClick={this.increment.bind(this, 'ones')}>
          <span className='fa fa-arrow-up'></span>
        </button>
        <h1 className='col-6 counter-number self-center p0 m0'>{this.props.tens}</h1>
        <h1 className='col-6 counter-number self-center p0 m0'>{this.props.ones}</h1>
        <button className='col-6' onClick={this.decrement.bind(this, 'tens')}>
          <span className='fa fa-arrow-down'></span>
        </button>
        <button className='col-6' onClick={this.decrement.bind(this, 'ones')}>
          <span className='fa fa-arrow-down'></span>
        </button>
      </section>
    );
  }
})
