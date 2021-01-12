import React from 'react';
import {shallow} from 'enzyme';
import NoteView from '../src/components/dashboard/NoteView';
import UserNoteServices from '../services/UserNoteServices';

describe('test NoteView', () => {
    it('should match to snapshot', () => {
        const component = shallow(<NoteView />)
        expect(component).toMatchSnapshot();
    })

})