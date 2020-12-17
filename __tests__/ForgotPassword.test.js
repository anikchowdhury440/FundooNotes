import React from 'react';
import {shallow} from 'enzyme';
import ForgotPassword from '../src/components/ForgotPassword';
import UserServices from '../services/UserServices';

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

    it('test onPress event of reset password button when all textinput empty it will update the stateEmpty state to true ', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPassword onPress = {onPressEvent}/>)
        const instance = component.instance();
        await instance.handleResetPasswordButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.emailEmpty).toBe(true)
    })

    it('test onPress event of reset password button when email is valid it will navigate to Login Screen', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPassword onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        instance.emailHandler('anikchowdhury440@gmail.com')
        await instance.handleResetPasswordButton();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.forgotPassword(instance.state.email).then(() => expect(navigation.navigate).toBeCalledWith('Login'))
    })

    it('test onPress event of reset password button when email is invalid then invalidEmail state should be true', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPassword onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        instance.emailHandler('anikchowdhury44@gmail.com')
        await instance.handleResetPasswordButton();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.forgotPassword(instance.state.email).catch(error => expect(instance.state.invalidEmail).toBe(true))
    })
})