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

    it('test when password provided in textinput should update password state', async () => {
        const component = shallow(<ForgotPassword/>)
        expect(component.instance().state.password).toBe('')
        component.instance().passwordHandler('Anik#1234')
        expect(component.instance().state.password).toBe('Anik#1234')
    })

    it('test the confirm password provided in textinput should update confirm password state', async () => {
        const component = shallow(<ForgotPassword/>)
        expect(component.instance().state.confirmPassword).toBe('')
        component.instance().confirmPasswordHandler('Anik#1234')
        expect(component.instance().state.confirmPassword).toBe('Anik#1234')
    })

    it('test when provided password is valid password validation state will be true', () => {
        const component = shallow(<ForgotPassword/>)
        component.instance().setState({ password : 'Anik#1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(true)
    })

    it('test when provided password is invalid password validation state will be false', () => {
        const component = shallow(<ForgotPassword/>)
        component.instance().setState({ password : 'anik1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(false)
    })

    it('test when provided confirm password matches password confirm password validation state will be true', () => {
        const component = shallow(<ForgotPassword/>)
        component.instance().setState({ password : 'Anik#1234'})
        component.instance().setState({ confirmPassword : 'Anik#1234'})
        component.instance().validateConfirmPassword();
        expect(component.instance().state.confirmPasswordValidation).toBe(true)
    })

    it('test when provided confirm password does not matches password confirm password validation state will be false', () => {
        const component = shallow(<ForgotPassword/>)
        component.instance().setState({ password : 'Anik#1234'})
        component.instance().setState({ confirmPassword : 'Anik@1234'})
        component.instance().validateConfirmPassword();
        expect(component.instance().state.confirmPasswordValidation).toBe(false)
    })

    it('test onPress event of eye icon of password textinput called it will change the secureTextPassword State', () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPassword onPress = {onPressEvent}/>)
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

    it('test onPress event of eye icon of confirm password textinput called it will change the secureTextConfirmPassword State', () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPassword onPress = {onPressEvent}/>)
        const instance = component.instance();
        expect(instance.state.secureTextConfirmPassword).toBe(true);
        instance.handleSecureTextConfirmPassword();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(1);
        expect(instance.state.secureTextConfirmPassword).toBe(false);
        instance.handleSecureTextConfirmPassword();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(2);
        expect(instance.state.secureTextConfirmPassword).toBe(true);
    })

    it('test onPress event of sign up button it will navigate to sign up screen', () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPassword onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.handleSignUpButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("Register");
    })

    // it('test onPress event of reset password button when correct credential it will navigate login screen', async () => {
    //     const navigation = { navigate : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<ForgotPassword onPress = {onPressEvent} navigation = {navigation}/>)
    //     const instance = component.instance();
    //     instance.setState({
    //         email : 'anik@gmail.com',
    //         password : 'Anik#1234',
    //         confirmPassword : 'Anik#1234'
    //     })
    //     await instance.handleResetPasswordButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(navigation.navigate).toBeCalledWith("Login");
    // })
})