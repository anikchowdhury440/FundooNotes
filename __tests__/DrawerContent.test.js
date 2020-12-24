import React from 'react';
import {shallow} from 'enzyme';
import DrawerContent from '../src/components/dashboard/DrawerContent'

describe('test DrawerContent', () => {
    it('should match to snapshot', () => {
        const component = shallow(<DrawerContent />)
        expect(component).toMatchSnapshot();
    })
})