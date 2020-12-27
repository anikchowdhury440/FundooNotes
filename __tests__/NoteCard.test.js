import React from 'react';
import {shallow} from 'enzyme';
import NoteCard from '../src/components/dashboard/NoteCard';

describe('test NoteCard', () => {
    it('should match to snapshot', () => {
        const component = shallow(<NoteCard />)
        expect(component).toMatchSnapshot();
    })

})