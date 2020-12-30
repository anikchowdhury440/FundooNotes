import React from 'react';
import {shallow} from 'enzyme';
import NoteView from '../src/components/dashboard/NoteView';
import UserNoteServices from '../services/UserNoteServices';

describe('test NoteView', () => {
    it('should match to snapshot', () => {
        const component = shallow(<NoteView />)
        expect(component).toMatchSnapshot();
    })

    it('test component did mount method should get user details and Update State', async () => {
        const component = shallow(<NoteView/>)
        const instance = component.instance();
        await instance.componentDidMount()
        return UserNoteServices.getNoteFromDatabase('QvtrCiQfg5YpagwmYMiczn3AlPk1')
        .then((user) => {
            let notes = user ? user : {}
            expect(instance.state.userNotes).toBe(notes)
        })
    })
})