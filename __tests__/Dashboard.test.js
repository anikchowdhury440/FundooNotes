import React from 'react';
import {shallow} from 'enzyme';
import NoteScreen from '../src/components/dashboard/NoteScreen';

describe('test Dashboard', () => {
    it('should match to snapshot', () => {
        const component = shallow(<NoteScreen/>)
        expect(component).toMatchSnapshot();
    })

})