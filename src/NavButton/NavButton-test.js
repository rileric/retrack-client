import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavButton from './NavButton';

describe('NavButton component', () => {
    const props = {
        tag: 'a',
        className: 'test-class-name',
        children: <p>test children</p>,
        'data-other': 'test-other-prop'
    };

    it('renders a button.NavButton by default', () => {
        const wrapper = shallow(<NavButton />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders the circle button from props', () => {
        const wrapper = shallow(<NavButton {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});