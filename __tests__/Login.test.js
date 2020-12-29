import React from 'react';
import {shallow} from 'enzyme';
import Login from '../src/components/pages/Login'
import UserServices from '../services/UserServices';
import SocialServices from '../services/SocialServices';

describe('test Login', () => {
    // beforeEach(() => {
    //     jest.setTimeout(30000);
    // });

    it('test when render should match to snapshot', async () => {
        const component = shallow(<Login/>)
        expect(component).toMatchSnapshot();
    })

    it('test when email provided in textinput should update email state', async () => {
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

    it('test onPress event of eye icon of password textinput called it will change the secureTextPassword State', async () => {
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

    it('test onPress event of sign up button it will navigate to sign up screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<Login onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.handleSignUpButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("Register");
    })

    it('test onPress event of forgot password button it will navigate forgot password screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<Login onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.handleForgotPasswordButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("ForgotPassword");
    })

    it('test onPress event of sign in button when all textinput empty it will update the stateEmpty state to true ', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<Login onPress = {onPressEvent}/>)
        const instance = component.instance();
        await instance.handleSignInButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.emailEmpty).toBe(true)
        expect(instance.state.passwordEmpty).toBe(true)
    })

    // it('test onPress event of sign in button when email is valid but password invalid then invalidPassword state should be true', async() => {
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<Login onPress = {onPressEvent}/>)
    //     const instance = component.instance();
    //     instance.emailHandler('anikchowdhury440@gmail.com')
    //     instance.passwordHandler('Anik#12')
    //     await instance.handleSignInButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     return UserServices.login(instance.state.email, instance.state.password).catch(error => expect(instance.state.invalidPassword).toBe(true))
    // })

    // it('test onPress event of sign in button when email is invalid then invalidEmail state should be true', async() => {
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<Login onPress = {onPressEvent}/>)
    //     const instance = component.instance();
    //     instance.emailHandler('anikchowdhury102@gmail.com')
    //     instance.passwordHandler('Anik#1234')
    //     await instance.handleSignInButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     return UserServices.login(instance.state.email, instance.state.password).catch(error => expect(instance.state.invalidEmail).toBe(true))
    // }, 10000)

    // it('test onPress event of sign in button when email and password is valid it will navigate to Notes Screen', async () => {
    //     const navigation = { push : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<Login onPress = {onPressEvent} navigation = {navigation} />)
    //     const instance = component.instance();
    //     instance.emailHandler('anikchowdhury440@gmail.com')
    //     instance.passwordHandler('Anik@1234')
    //     await instance.handleSignInButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     return UserServices.login(instance.state.email, instance.state.password).then(user => expect(navigation.push).toBeCalledWith('Home', {'screen': 'Notes'}))
    // })

    // it('test onPress event of facebook sign in button it will navigate to Note Screen', async() => {
    //     const navigation = { navigate : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<Login onPress = {onPressEvent} navigation = {navigation} />)
    //     const instance = component.instance();
    //     await instance.handleFacebookLoginButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     return SocialServices.facebookLogin().then(userCredential => expect(navigation.push).toBeCalledWith('Home'))
    // })
})