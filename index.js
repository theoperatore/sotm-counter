'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import fastclick from 'fastclick';
import debug from 'debug';

import Counter from './Counter';

let mount = document.querySelector('#mount');

new fastclick(mount);

ReactDOM.render(<Counter />, mount);