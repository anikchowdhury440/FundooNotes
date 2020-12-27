import React from 'react';
import {shallow} from 'enzyme';
import DeletedScreen from '../src/components/dashboard/DeletedScreen';

describe('test DeletedScreen', () => {
    it('should match to snapshot', () => {
        const component = shallow(<DeletedScreen />)
        expect(component).toMatchSnapshot();
    })

    it('test onPress of Menu icon button it will open the Navigation Drawer', async () => {
        const navigation = { openDrawer : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<DeletedScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        await instance.handleMenuButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.openDrawer).toHaveBeenCalled()
    })

})