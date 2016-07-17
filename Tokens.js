'use strict';

import React, { PropTypes } from 'react';
import debug from 'debug';

const log = debug('sotm:token');

const Token = React.createClass({
  displayName: 'Token',

  propTypes: {
    type: PropTypes.number.isRequired,
  },

  render() {
    return <div className='sotm-token-container'>
      <div className='sotm-token-star'>
        <span
          className={`sotm-token type-${this.props.type}`}
        >
          { this.props.type }
        </span>
      </div>
    </div>
  }
});

export default React.createClass({
  displayName: 'Tokens',

  propTypes: {
    ones: PropTypes.number,
    tens: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      ones: 0,
      tens: 0,
      onUpdate() {}
    }
  },

  increment() {
    let num = this.props.ones + 1;

    let newState = {
      ones: num,
      tens: this.props.tens
    }

    if (num > 9) {
      newState.tens += 1;
      newState.ones = 0;
    }

    log('increment %s: %o', 'ones', newState);
    this.props.onUpdate(newState);
  },

  decrement() {
    let num = this.props.ones - 1;

    let newState = {
      ones: num,
      tens: this.props.tens
    }

    if (num < 0) {
      newState.tens -= 1;
      newState.ones = 9;
    }

    newState.tens = newState.tens < 0 ? 0 : newState.tens;

    log('decrement %s: %o', 'ones', newState);
    this.props.onUpdate(newState);
  },

  pad(arr, itm, num) {
    let out = arr.slice();

    for (let i = 0; i < num; i++) {
      out.push(itm);
    }

    return out;
  },

  renderTokens() {
    let total = (this.props.tens * 10) + this.props.ones;

    let twentyFives = (total / 25) < 1 ? 0 : (total / 25) | 0;
    let tens = ((total - (twentyFives * 25)) / 10) < 1 ? 0 : ((total - (twentyFives * 25)) / 10) | 0;
    let fives = ((total - (twentyFives * 25) - (tens * 10)) / 5) < 1 ? 0 : ((total - (twentyFives * 25) - (tens * 10)) / 5) | 0;
    let ones = ((total - (twentyFives * 25) - (tens * 10) - (fives * 5)));

    let out = []

    out = this.pad(out, 25, twentyFives);
    out = this.pad(out, 10, tens);
    out = this.pad(out, 5, fives);
    out = this.pad(out, 1, ones);

    return out.map((itm, i) => {
      return (
        <div
          className='token-container inline-block center'
          key={i}
        >
          <Token type={itm} />
        </div>
      )
    })
  },

  render() {
    return <section className='flex flex-column flex-auto'>
      <div className='flex-auto flex-wrap p1 overflow-auto'>
        { this.renderTokens() }
      </div>
      <footer>
        <div className='full-height inline-block center col-6' onClick={this.decrement}>
          <span className='fa fa-arrow-down'/>
        </div>
        <div className='full-height inline-block center col-6' onClick={this.increment}>
          <span className='fa fa-arrow-up'/>
        </div>
      </footer>
    </section>
  }
})
