// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

global.shallow = shallow;
global.mount = mount;
configure({adapter: new Adapter()});

const {jsdom} = require('jsdom');

global.document = jsdom('');
global.window = document.defaultView;