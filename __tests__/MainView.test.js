import React from 'react';
import {shallow} from 'enzyme';
import MainView from '../src/components/dashboard/MainView';

describe('test MainView', () => {
    it('should match to snapshot', () => {
        const component = shallow(<MainView />)
        expect(component).toMatchSnapshot();
    })

})