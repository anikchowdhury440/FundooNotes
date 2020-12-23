import React from 'react';
import {shallow} from 'enzyme';
import DashBoard from '../src/components/dashboard/DashBoard';


describe('test Dashboard', () => {
    it('should match to snapshot', () => {
        const component = shallow(<DashBoard/>)
        expect(component).toMatchSnapshot();
    })

})