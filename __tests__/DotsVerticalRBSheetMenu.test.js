import React from 'react';
import {shallow} from 'enzyme';
import DotsVerticalRBSheetMenu from '../src/components/dashboard/DotsVerticalRBSheetMenu'
import { Menu, TouchableRipple } from 'react-native-paper';

describe('test DotsVerticalRBSheetMenu', () => {

    it('should match to snapshot', () => {
        const component = shallow(<DotsVerticalRBSheetMenu />)
        expect(component).toMatchSnapshot();
    })

    it('test menu item in DotsVerticalRBSheetMenu component', () => {
        const component = shallow(<DotsVerticalRBSheetMenu />)
        expect(component.find(Menu.item)).toHaveLength(5)
        // expect(component.find(TouchableRipple)).toHaveLength(5)
    })
})