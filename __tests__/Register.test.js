import React from 'react';
import {shallow} from 'enzyme';
import Register from '../src/components/Register';

describe('test Register', () => {
    it('should match to snapshot', () => {
        const component = shallow(<Register/>)
        expect(component).toMatchSnapshot();
    })
})