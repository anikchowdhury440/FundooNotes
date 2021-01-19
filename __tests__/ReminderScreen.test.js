import React from 'react';
import {shallow} from 'enzyme';
import ReminderScreen from '../src/components/dashboard/ReminderScreen';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initialState = {
    userId : '',
    userLabel : [],
    screenName : '',
    labelKey : ''
}
const store = mockStore(initialState)

describe('test ReminderScreen', () => {
    it('should match to snapshot', () => {
        const component = shallow(<ReminderScreen store = {store}/>)
        expect(component).toMatchSnapshot();
    })
})