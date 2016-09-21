import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';

test('that Home component is rendered', () => {
  const component = shallow(<Home />);
  expect(component).toMatchSnapshot();
});
