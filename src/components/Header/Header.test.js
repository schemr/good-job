import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './Header';

configure({adapter: new Adapter()});

describe('<Header />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    })
    it('should render <Header />', () => {
        expect(wrapper.length).toBe(1);
    });
    // it('one child when not authenticated', () => {
    //     wrapper.state.isAuth = false;
    //     console.log(wrapper.find('div'));
    //     expect(wrapper).toHaveLength(1);
    // })
})
