import React from 'react';
import {shallow} from 'enzyme';
import TopBar from '../src/components/dashboard/TopBar';
import { Appbar, Avatar } from 'react-native-paper';

describe('test TopBar', () => {
    it('should match to snapshot', () => {
        const component = shallow(<TopBar/>)
        expect(component).toMatchSnapshot();
    })

    it('test component in top bar component', () => {
        const component = shallow(<TopBar />)
        expect(component.find(Appbar.Action)).toHaveLength(2)
        expect(component.find(Appbar.Content)).toHaveLength(1)
        expect(component.find(Avatar.Image)).toHaveLength(1)
    })

    it('test onPress of Menu icon button it will open the Navigation Drawer', async () => {
        const navigation = { openDrawer : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<TopBar onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        await instance.handleMenuButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.openDrawer).toHaveBeenCalled()
    })
})