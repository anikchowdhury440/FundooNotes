import React from 'react';
import {shallow} from 'enzyme';
import AddReminder from '../src/components/dashboard/AddReminder'
import { } from 'react-native-paper';

describe('test AddReminder', () => {

    it('should match to snapshot', () => {
        const component = shallow(<AddReminder />)
        expect(component).toMatchSnapshot();
    })

})