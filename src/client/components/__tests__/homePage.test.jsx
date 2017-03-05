import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HomePage from '../homePage';

describe('<HomePage/>', () => {
  it('renders', () => {
    const component = shallow(<HomePage />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
