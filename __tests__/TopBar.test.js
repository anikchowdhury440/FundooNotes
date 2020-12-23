import React from 'react';
import {shallow} from 'enzyme';
import TopBar from '../src/components/dashboard/TopBar';

describe('test TopBar', () => {
    it('should match to snapshot', () => {
        const component = shallow(<TopBar/>)
        expect(component).toMatchSnapshot();
    })

    it('test onPress event of list view icon or grid view icon it will change the listView State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<TopBar onPress = {onPressEvent}/>)
        const instance = component.instance();
        expect(instance.state.listView).toBe(true);
        await instance.selectView();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(1);
        expect(instance.state.listView).toBe(false);
        await instance.selectView();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(2);
        expect(instance.state.listView).toBe(true);
    })
})