import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NoMatch from '../noMatch';

describe('<NoMatch/>', () => {
  it('renders', () => {
    const component = shallow(<NoMatch />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
