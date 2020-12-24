import React from 'react';
import {shallow} from 'enzyme';
import ForgotPassword from '../src/components/pages/ForgotPassword';
import UserServices from '../services/UserServices';

describe('test ForgotPassword',() => {
    // beforeEach(() => {
    //     jest.setTimeout(30000);
    // });
    
    it('should match to snapshot', async () => {
        const component = shallow(<ForgotPassword/>)
        expect(component).toMatchSnapshot();
    })

    it('test when email provided in textinput should update email state', async () => {
        const component = shallow(<ForgotPassword/>)
        expect(component.instance().state.email).toBe('')
        component.instance().emailHandler('anik@gmail.com')
        expect(component.instance().state.email).toBe('anik@gmail.com')
    })

    it('test onPress event of reset password button when all textinput empty it will update the stateEmpty state to true ', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPassword onPress = {onPressEvent}/>)
        const instance = component.instance();
        await instance.handleResetPasswordButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.emailEmpty).toBe(true)
    })

    it('test onPress event of reset password button when email is invalid then invalidEmail state should be true', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPassword onPress = {onPressEvent}/>)
        const instance = component.instance();
        instance.emailHandler('anikchowdhury10101@gmail.com')
        await instance.handleResetPasswordButton();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.forgotPassword(instance.state.email).catch(error => {
            expect(error).toBe('Email not Found')
            expect(instance.state.invalidEmail).toBe(true)
        })
    }, 10000)

    // it('test onPress event of reset password button when email is valid it will set visible state for dialog should be true', async () => {
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<ForgotPassword onPress = {onPressEvent}/>)
    //     const instance = component.instance();
    //     instance.emailHandler('anikchowdhury440@gmail.com')
    //     await instance.handleResetPasswordButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     return UserServices.forgotPassword(instance.state.email).then(() => expect(instance.state.visible).toBe(true))
    // }, 15000)

    it('test onDismiss event of dialog button it will set visible state for dialog should be false', async () => {
        const onDismissEvent = jest.fn();
        const component = shallow(<ForgotPassword onDismiss = {onDismissEvent}/>)
        const instance = component.instance();
        await instance.hideDialog();
        expect(onDismissEvent).toHaveBeenCalled();
        expect(instance.state.visible).toBe(false)
    })

    it('test onPress event of dialog action button it will navigate to Login Screen', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPassword onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        await instance.handleDialogButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith('Login')
    })
})