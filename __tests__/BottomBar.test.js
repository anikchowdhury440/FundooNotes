import React from 'react';
import {shallow} from 'enzyme';
import BottomBar from '../src/components/dashboard/Bottombar';
import { Appbar } from 'react-native-paper';

describe('test BottomBar', () => {
    it('should match to snapshot', () => {
        const component = shallow(<BottomBar />);
        expect(component).toMatchSnapshot();
    })

    it('test appbar action and icon in bottom bar component', () => {
        const component = shallow(<BottomBar />)
        expect(component.find(Appbar.Action)).toHaveLength(5)
        expect(component.find(Appbar.Action).at(0).props().icon).toEqual('check-box-outline')
        expect(component.find(Appbar.Action).at(1).props().icon).toEqual('brush')
        expect(component.find(Appbar.Action).at(2).props().icon).toEqual('microphone-outline')
        expect(component.find(Appbar.Action).at(3).props().icon).toEqual('panorama')
        expect(component.find(Appbar.Action).at(4).props().icon).toEqual('plus')
    })

    it('test onPress event of plus icon when lableId passed as props it will navigate to add note screen' , async () => {
        const navigation = { push : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<BottomBar onPress = {onPressEvent} navigation = {navigation} labelId = {1234}/>)
        const instance = component.instance();
        await instance.handlePlusIconButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toBeCalledWith('AddNote', {labelId : 1234, newNote : true});
    })

    it('test onPress event of plus icon  when labelId not passed as props it will navigate to add note screen' , async () => {
        const navigation = { push : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<BottomBar onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        await instance.handlePlusIconButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toBeCalledWith('AddNote', {newNote : true});
    })


})