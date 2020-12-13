import React from 'react';
import {shallow} from 'enzyme';
import Register from '../src/components/Register';

describe('test Register', () => {
    it('should match to snapshot', () => {
        const component = shallow(<Register/>)
        expect(component).toMatchSnapshot();
    })

    it('test the first name handler method should update first name state', () => {
        const component = shallow(<Register/>)
        expect(component.instance().state.firstName).toBe('')
        component.instance().firstNameHandler('Anik')
        expect(component.instance().state.firstName).toBe('Anik')
    })

    it('test the last name handler method should update last name state', () => {
        const component = shallow(<Register/>)
        expect(component.instance().state.lastName).toBe('')
        component.instance().lastNameHandler('Chowdhury')
        expect(component.instance().state.lastName).toBe('Chowdhury')
    })

    it('test the email handler method should update email state', () => {
        const component = shallow(<Register/>)
        expect(component.instance().state.email).toBe('')
        component.instance().emailHandler('anik@gmail.com')
        expect(component.instance().state.email).toBe('anik@gmail.com')
    })

    it('test the password handler method should update password state', () => {
        const component = shallow(<Register/>)
        expect(component.instance().state.password).toBe('')
        component.instance().passwordHandler('Anik#1234')
        expect(component.instance().state.password).toBe('Anik#1234')
    })

    it('test the confirm password handler method should update confirm password state', () => {
        const component = shallow(<Register/>)
        expect(component.instance().state.confirmPassword).toBe('')
        component.instance().confirmPasswordHandler('Anik#1234')
        expect(component.instance().state.confirmPassword).toBe('Anik#1234')
    })

    it('test when firstName correct firstName validation state will be true', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ firstName : 'Anik'})
        component.instance().validateFirstName()
        expect(component.instance().state.firstNameValidation).toBe(true)
    })

    it('test when firstName incorrect firstName validation state will be false', async () => {
        const component = shallow(<Register/>)
        component.instance().setState({ firstName : 'anik'})
        component.instance().validateFirstName()
        expect(component.instance().state.firstNameValidation).toBe(false)
    })

    it('test when lastName correct lastName validation state will be true', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ lastName : 'Chowdhury'})
        component.instance().validateLastName()
        expect(component.instance().state.lastNameValidation).toBe(true)
    })

    it('test when lastName incorrect lastName validation state will be false', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ lastName : 'chowdhury'})
        component.instance().validateLastName()
        expect(component.instance().state.lastNameValidation).toBe(false)
    })

    it('test when email correct email validation state will be true', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ email : 'anik@gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(true)
    })

    it('test when email incorrect email validation state will be false', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ email : 'anik.@gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(false)
    })

    it('test when password correct password validation state will be true', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ password : 'Anik#1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(true)
    })

    it('test when password incorrect password validation state will be false', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ password : 'anik1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(false)
    })

    it('test when confirm password matches password confirm password validation state will be true', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ password : 'Anik#1234'})
        component.instance().setState({ confirmPassword : 'Anik#1234'})
        component.instance().validateConfirmPassword();
        expect(component.instance().state.confirmPasswordValidation).toBe(true)
    })

    it('test when confirm password does not matches password confirm password validation state will be false', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ password : 'Anik#1234'})
        component.instance().setState({ confirmPassword : 'Anik@1234'})
        component.instance().validateConfirmPassword();
        expect(component.instance().state.confirmPasswordValidation).toBe(false)
    })

    it('test onPress event of eye icon of password textinput called it will change the secureTextPassword State', () => {
        const onPressEvent = jest.fn();
        const component = shallow(<Register onPress = {onPressEvent}/>)
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

    it('test onPress event of eye icon of confirm password textinput called it will change the secureTextPassword State', () => {
        const onPressEvent = jest.fn();
        const component = shallow(<Register onPress = {onPressEvent}/>)
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

    it('test onPress event of sign in button it will navigate to sign in screen', () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<Register onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.handleSignInButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("Login");
    })

    it('test onPress event of sign up button it will store credential in keychain', () => {
        const navigation = { navigate : jest.fn() }
        const KeyChain = { setGenericPassword : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<Register onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.state.firstName = "Anik";
        instance.state.lastName = "Chowdhury"
        instance.state.email = "anik@gmail.com"
        instance.state.password = "Anik#1234"
        instance.state.confirmPassword = "Anik#1234"
        instance.handleSignUpButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("Login");
    })
})