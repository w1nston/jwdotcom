import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Home from '../Home';

test('that Home component is rendered', () => {
  const component = shallow(<Home />);
  expect(shallowToJson(component)).toMatchSnapshot();
});
