import React from 'react';
import {shallow} from 'enzyme';
import ForgotPassword from '../src/components/ForgotPassword';
describe('test ForgotPassword', () => {
    it('should match to snapshot', () => {
        const component = shallow(<ForgotPassword/>)
        expect(component).toMatchSnapshot();
    })

    it('test when email provided in textinput should update email state', async () => {
        const component = shallow(<ForgotPassword/>)
        expect(component.instance().state.email).toBe('')
        component.instance().emailHandler('anik@gmail.com')
        expect(component.instance().state.email).toBe('anik@gmail.com')
    })
})