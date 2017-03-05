import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BlogPage from '../blogPage';

describe('<BlogPage/>', () => {
  it('renders', () => {
    const component = shallow(<BlogPage />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
