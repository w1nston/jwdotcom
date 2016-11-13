import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Blog from '../Blog';

test('that Blog component is rendered', () => {
  const component = shallow(<Blog />);
  expect(shallowToJson(component)).toMatchSnapshot();
});
