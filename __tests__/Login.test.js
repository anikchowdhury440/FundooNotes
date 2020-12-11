import React from 'react';
import {shallow} from 'enzyme';

import Login from '../src/components/Login'

describe('test Login', () => {
    it('test when render should match to snapshot', () => {
        const component = shallow(<Login/>)
        expect(component).toMatchSnapshot();
    })

    it('test the email handler method should update email state', async () => {
        const component = shallow(<Login/>)
        expect(component.instance().state.email).toBe('')
        await component.instance().emailHandler('anik@gmail.com')
        expect(component.instance().state.email).toBe('anik@gmail.com')
    })

    it('test the password handler method should update password state', async () => {
        const component = shallow(<Login/>)
        expect(component.instance().state.password).toBe('')
        await component.instance().passwordHandler('anik#1998')
        expect(component.instance().state.password).toBe('anik#1998')
    })

    it('test the validate email method  when email correct email validation state will be true', async () => {
        const component = shallow(<Login/>)
        await component.instance().emailHandler('anik@gmail.com')
        expect(component.instance().state.emailValidation).toBe(true)
    })

    it('test the validate email method  when email incorrect email validation state will be false', async () => {
        const component = shallow(<Login/>)
        await component.instance().emailHandler('anik.@gmail.com')
        expect(component.instance().state.emailValidation).toBe(false)
    })

    it('test the validate password method  when password correct password validation state will be true', async () => {
        const component = shallow(<Login/>)
        await component.instance().passwordHandler('Anik#1234')
        expect(component.instance().state.passwordValidation).toBe(true)
    })

    it('test the validate password method  when password incorrect password validation state will be false', async () => {
        const component = shallow(<Login/>)
        await component.instance().passwordHandler('anik1234')
        expect(component.instance().state.passwordValidation).toBe(false)
    })

    it('test onPress event of eye icon called it will change the secureTextPassword State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<Login onPress = {onPressEvent}/>)
        expect(component.instance().state.secureTextPassword).toBe(true);
        await component.instance().handleSecureTextPassword();
        expect(onPressEvent).toHaveBeenCalled();
        expect(component.instance().state.secureTextPassword).toBe(false);
        await component.instance().handleSecureTextPassword();
        expect(onPressEvent).toHaveBeenCalled();
        expect(component.instance().state.secureTextPassword).toBe(true);
    })
})