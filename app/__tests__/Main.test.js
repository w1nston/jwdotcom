import React from 'react';
import { shallow } from 'enzyme';
import Main from '../Main';

test('that the Main routes are rendered correctly', () => {
  const component = shallow(<Main />);
  expect(component).toMatchSnapshot();
});
