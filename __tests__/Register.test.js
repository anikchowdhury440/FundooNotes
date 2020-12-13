import React from 'react';
import {shallow} from 'enzyme';
import Register from '../src/components/Register';

describe('test Register', () => {
    it('should match to snapshot', () => {
        const component = shallow(<Register/>)
        expect(component).toMatchSnapshot();
    })

    it('test when first name provided in textinput should update first name state', () => {
        const component = shallow(<Register/>)
        expect(component.instance().state.firstName).toBe('')
        component.instance().firstNameHandler('Anik')
        expect(component.instance().state.firstName).toBe('Anik')
    })

    it('test when last name provided in textinput should update last name state', () => {
        const component = shallow(<Register/>)
        expect(component.instance().state.lastName).toBe('')
        component.instance().lastNameHandler('Chowdhury')
        expect(component.instance().state.lastName).toBe('Chowdhury')
    })

    it('test when email provided in textinput should update email state', () => {
        const component = shallow(<Register/>)
        expect(component.instance().state.email).toBe('')
        component.instance().emailHandler('anik@gmail.com')
        expect(component.instance().state.email).toBe('anik@gmail.com')
    })

    it('test when password provided in textinput should update password state', () => {
        const component = shallow(<Register/>)
        expect(component.instance().state.password).toBe('')
        component.instance().passwordHandler('Anik#1234')
        expect(component.instance().state.password).toBe('Anik#1234')
    })

    it('test the confirm password provided in textinput should update confirm password state', () => {
        const component = shallow(<Register/>)
        expect(component.instance().state.confirmPassword).toBe('')
        component.instance().confirmPasswordHandler('Anik#1234')
        expect(component.instance().state.confirmPassword).toBe('Anik#1234')
    })

    it('test when provided firstName is valid firstName validation state will be true', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ firstName : 'Anik'})
        component.instance().validateFirstName()
        expect(component.instance().state.firstNameValidation).toBe(true)
    })

    it('test when provided firstName is invalid firstName validation state will be false', async () => {
        const component = shallow(<Register/>)
        component.instance().setState({ firstName : 'anik'})
        component.instance().validateFirstName()
        expect(component.instance().state.firstNameValidation).toBe(false)
    })

    it('test when provided lastName is valid lastName validation state will be true', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ lastName : 'Chowdhury'})
        component.instance().validateLastName()
        expect(component.instance().state.lastNameValidation).toBe(true)
    })

    it('test when provided lastName is invalid lastName validation state will be false', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ lastName : 'chowdhury'})
        component.instance().validateLastName()
        expect(component.instance().state.lastNameValidation).toBe(false)
    })

    it('test when provided email is valid email validation state will be true', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ email : 'anik@gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(true)
    })

    it('test when provided email is invalid email validation state will be false', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ email : 'anik.@gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(false)
    })

    it('test when provided password is valid password validation state will be true', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ password : 'Anik#1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(true)
    })

    it('test when provided password is invalid password validation state will be false', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ password : 'anik1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(false)
    })

    it('test when provided confirm password matches password confirm password validation state will be true', () => {
        const component = shallow(<Register/>)
        component.instance().setState({ password : 'Anik#1234'})
        component.instance().setState({ confirmPassword : 'Anik#1234'})
        component.instance().validateConfirmPassword();
        expect(component.instance().state.confirmPasswordValidation).toBe(true)
    })

    it('test when provided confirm password does not matches password confirm password validation state will be false', () => {
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

    it('test onPress event of eye icon of confirm password textinput called it will change the secureTextConfirmPassword State', () => {
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

    it('test onPress event of sign up button when valid data it will navigate to sign in screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<Register onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.setState({
            firstName : 'Anik',
            lastName : 'Chowdhury',
            email : 'anik@gmail.com',
            password : 'Anik@1234',
            confirmPassword : 'Anik@1234',
        })
        await instance.handleSignUpButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("Login");
    })
})