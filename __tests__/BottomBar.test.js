import React from 'react';
import {shallow} from 'enzyme';
import BottomBar from '../src/components/dashboard/Bottombar';

describe('test BottomBar', () => {
    it('should match to snapshot', () => {
        const component = shallow(<BottomBar />)
        expect(component).toMatchSnapshot();
    })

})