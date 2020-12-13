import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import Login from '../src/components/Login'

describe('test Login', () => {
    it('test when render should match to snapshot', () => {
        const component = shallow(<Login/>)
        expect(component).toMatchSnapshot();
    })

    it('test when email provided in textinput should update email state', () => {
        const component = shallow(<Login/>)
        expect(component.instance().state.email).toBe('')
        component.instance().emailHandler('anik@gmail.com')
        expect(component.instance().state.email).toBe('anik@gmail.com')
    })

    it('test when password provided in textinput should update password state', async () => {
        const component = shallow(<Login/>)
        expect(component.instance().state.password).toBe('')
        component.instance().passwordHandler('Anik#1998')
        expect(component.instance().state.password).toBe('Anik#1998')
    })

    it('test when provided email is valid email validation state will be true', () => {
        const component = shallow(<Login/>)
        component.instance().setState({ email : 'anik@gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(true)
    })

    it('test when provided email is invalid email validation state will be false', () => {
        const component = shallow(<Login/>)
        component.instance().setState({ email : 'anik.@gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(false)
    })

    it('test when provided password is valid password validation state will be true', () => {
        const component = shallow(<Login/>)
        component.instance().setState({ password : 'Anik#1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(true)
    })

    it('test when password password is invalid password validation state will be false', () => {
        const component = shallow(<Login/>)
        component.instance().setState({ password : 'anik1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(false)
    })

    it('test onPress event of eye icon of password textinput called it will change the secureTextPassword State', () => {
        const onPressEvent = jest.fn();
        const component = shallow(<Login onPress = {onPressEvent}/>)
        const instance = component.instance();
        expect(instance.state.secureTextPassword).toBe(true);
        instance.handleSecureTextPassword();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(1);
        expect(instance.state.secureTextPassword).toBe(false);
        instance.handleSecureTextPassword();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(2);
        expect(instance.state.secureTextPassword).toBe(true);
    })

    it('test onPress event of sign up button it will navigate to sign up screen', () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<Login onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.handleSignUpButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("Register");
    })

    it('test onPress event of forgot password button it will navigate forgot password screen', () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<Login onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.handleForgotPasswordButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("ForgotPassword");
    })
})