import React from 'react';
import { shallow } from 'enzyme';
import Blog from '../Blog';

test('that Blog component is rendered', () => {
  const component = shallow(<Blog />);
  expect(component).toMatchSnapshot();
});
