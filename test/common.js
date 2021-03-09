// Declare dependencies
import chai from 'chai';

const jsdom = require('jsdom-global')();
const expect = chai.expect;
chai.use(require('chai-dom'))

global.expect = expect;
global.jsdom = jsdom;