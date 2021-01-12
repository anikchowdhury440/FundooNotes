import React from 'react';
import {shallow} from 'enzyme';
import DeletedScreen from '../src/components/dashboard/DeletedScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('test DeletedScreen', () => {
    let store;
    
    beforeEach(() => {
        store = mockStore({});
    });
    it('should match to snapshot', () => {
        const component = shallow(<Provider store={store}>
                                        <DeletedScreen />
                                    </Provider>
                                );
        expect(component).toMatchSnapshot();
    })

    it('test onPress of Menu icon button it will open the Navigation Drawer', async () => {
        const navigation = { openDrawer : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<Provider store = {store}>
                                    <DeletedScreen onPress = {onPressEvent} navigation = {navigation}/>
                                </Provider>)
        const instance = component.instance();
        await instance.handleMenuButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.openDrawer).toHaveBeenCalled()
    })

})