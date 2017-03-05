import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RootComponent from '../rootComponent';

describe('<RootComponent/>', () => {
  it('renders', () => {
    const Router = jest.fn();
    const component = shallow(<RootComponent Router={Router} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
