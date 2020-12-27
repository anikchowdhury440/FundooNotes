import React from 'react';
import {shallow} from 'enzyme';
import AddNoteScreen from '../src/components/dashboard/AddNoteScreen'
import {Appbar, Menu, Snackbar} from 'react-native-paper'
import RBSheet from 'react-native-raw-bottom-sheet';

describe('test AddNoteScrren', () => {

    it('should match to snapshot', () => {
        const component = shallow(<AddNoteScreen />)
        expect(component).toMatchSnapshot();
    })

    it('test when title provided in textinput should update title state', async () => {
        const component = shallow(<AddNoteScreen/>)
        expect(component.instance().state.title).toBe('')
        component.instance().handleTitle('Good Morning')
        expect(component.instance().state.title).toBe('Good Morning')
    })

    it('test when note provided in textinput should update note state', async () => {
        const component = shallow(<AddNoteScreen/>)
        expect(component.instance().state.note).toBe('')
        component.instance().handleNote('Good Morning')
        expect(component.instance().state.note).toBe('Good Morning')
    })

    // it('test onPress event of back icon button when title and notes empty it will navigate to notes screen', async () => {
    //     const navigation = { push : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<AddNoteScreen onPress = {onPressEvent} navigation = {navigation}/>)
    //     const instance = component.instance();
    //     await instance.handleBackIconButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(navigation.push).toBeCalledWith("Home");
    // })

    // it('test onPress event of back icon button when title and notes are not empty it will navigate to notes screen', async () => {
    //     const navigation = { push : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<AddNoteScreen onPress = {onPressEvent} navigation = {navigation}/>)
    //     const instance = component.instance();
    //     instance.handleTitle('Good Morning')
    //     instance.handleNote('Good Morning')
    //     await instance.handleBackIconButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(navigation.push).toBeCalledWith("Home");
    // })

    it('test appbar action and icon in AddScreen component', () => {
        const component = shallow(<AddNoteScreen/>)
        expect(component.find(Appbar.Action)).toHaveLength(8)
        expect(component.find(Appbar)).toHaveLength(2)
        expect(component.find(RBSheet)).toHaveLength(1)
        expect(component.find(Snackbar)).toHaveLength(1)
        expect(component.find(Menu.Item)).toHaveLength(5)
    })

    // it('test componentDidMount in AddScreen component', async () => {
    //     const navigation = { push : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<AddNoteScreen/>)
    //     const instance = component.instance();
    //     await instance.componentDidMount();
    //     expect(instance.state.userId).notToBe('')
    // })

    // it('test onPress event of HandleDotIconButton it will call the RBSheet open function', async () => {
    //     const RBSheet = { open : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<AddNoteScreen onPress = {onPressEvent} RBSheet = {RBSheet}/>)
    //     const instance = component.instance();
    //     await instance.handleDotIconButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(RBSheet.open).toHaveBeenCalled();
    // })
})