import React from 'react';
import {shallow} from 'enzyme';
import SearchNotesScreen from '../src/components/dashboard/SearchNotesScreen';
import { Appbar } from 'react-native-paper';
import {TextInput} from 'react-native'

describe('test SearchNotesScreen', () => {
    it('should match to snapshot', () => {
        const component = shallow(<SearchNotesScreen />)
        expect(component).toMatchSnapshot();
    })

    it('test onPress event of back icon button it will navigate to notes screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SearchNotesScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        await instance.handleBackIconButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith('Home', { screen : 'Notes'})
    })

    it('test onPress event of close button it will change search and userNotesAfterSearch state', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<SearchNotesScreen onPress = {onPressEvent}/>)
        const instance = component.instance();
        await instance.handleCloseButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.search).toBe('')
        expect(instance.state.userNotesAfterSearch).toStrictEqual([])
    })

    it('test onPress event of select note it will navigate to add note screen', async () => {
        const onPressEvent = jest.fn();
        const navigation = { push : jest.fn() }
        const note = {note_id : 1}
        const component = shallow(<SearchNotesScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        await instance.selectNote(note);
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toBeCalledWith("AddNote", {"noteKey": 1, "notes": {"note_id": 1}})
    })

    it('test onChangeText in search textinput it will update the search state', async () => {
        const component = shallow(<SearchNotesScreen />)
        const instance = component.instance();
        instance.handleSearchTextInput('Anik');
        expect(instance.state.search).toBe('Anik')
        expect(instance.state.userNotesAfterSearch).not.toBe([])
    })

    it('test onChangeText in search textinput when textinput empty it will set userNotesAfterSearch to be []', async () => {
        const component = shallow(<SearchNotesScreen />)
        const instance = component.instance();
        instance.handleSearchTextInput('');
        expect(instance.state.userNotesAfterSearch).toStrictEqual([])
    })

    it('test component in SearchNotesScreen component', () => {
        const component = shallow(<SearchNotesScreen/>)
        expect(component.find(Appbar.Action)).toHaveLength(1)
        expect(component.find(TextInput)).toHaveLength(1)
        const instance = component.instance();
        instance.handleSearchTextInput('Anik');
        expect(component.find(Appbar.Action)).toHaveLength(2)
    })

})