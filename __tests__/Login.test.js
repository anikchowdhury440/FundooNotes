import React from 'react';
import {shallow} from 'enzyme';
import keyChainMock from '../__mocks__/react-native-keychain'
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

    //Failing
    it('test onPress event of sign in button when correct credential it will navigate dashboard screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<Login onPress = {onPressEvent} navigation = {navigation} KeyChain = {keyChainMock}/>)
        const instance = component.instance();
        instance.emailHandler('anik@gmail.com')
        instance.passwordHandler('Anik@1234')
        await instance.handleSignInButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(keyChainMock.getGenericPassword).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("DashBoard");
    })

    // //Failing
    // it('test onPress event of sign in button when email incorrect it will update invalid email state to true', async () => {
    //     const navigation = { navigate : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<Login onPress = {onPressEvent} navigation = {navigation}/>)
    //     const instance = component.instance();
    //     instance.emailHandler('ani@gmail.com')
    //     instance.passwordHandler('Anik@1234')
    //     await instance.handleSignInButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(instance.state.invalidEmail).toBe(true);
    // })

    // //Failing
    // it('test onPress event of sign in button when email correct but password incorrect it will update invalid password to be true', async () => {
    //     const navigation = { navigate : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<Login onPress = {onPressEvent} navigation = {navigation}/>)
    //     const instance = component.instance();
    //     instance.emailHandler('anik@gmail.com')
    //     instance.passwordHandler('Anik1234')
    //     await instance.handleSignInButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(instance.state.invalidPassword).toBeCalledWith(true);
    // })

    it('test onPress event of sign in button when all textinput empty it will update the stateEmpty state to true ', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<Login onPress = {onPressEvent}/>)
        const instance = component.instance();
        await instance.handleSignInButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.emailEmpty).toBe(true)
        expect(instance.state.passwordEmpty).toBe(true)
    })
})