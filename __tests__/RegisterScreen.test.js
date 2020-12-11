import React from 'react';
import {shallow} from 'enzyme';
import RegisterScreen from '../src/components/RegisterScreen';

describe('test RegisterScreen', () => {
    it('should match to snapshot', () => {
        const component = shallow(<RegisterScreen/>)
        expect(component).toMatchSnapshot();
    })
})