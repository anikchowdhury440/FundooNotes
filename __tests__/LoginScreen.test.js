import React from 'react';
import {shallow} from 'enzyme';
import LoginScreen from '../src/components/LoginScreen';

describe('test LoginScreen', () => {
    it('should match to snapshot', () => {
        const component = shallow(<LoginScreen/>)
        expect(component).toMatchSnapshot();
    })
})