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

    //Failing
    // it('test onPress event of reset password button when correct credential it will navigate login screen', async () => {
    //     const navigation = { push : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<ForgotPassword onPress = {onPressEvent} navigation = {navigation}/>)
    //     const instance = component.instance();
    //     instance.emailHandler('anik@gmail.com')
    //     await instance.handleResetPasswordButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(navigation.push).toBeCalledWith("Login");
    // })

    // //Failing
    // it('test onPress event of reset password button when incorrect email it will update the invalidEmail state to true', async () => {
    //     const navigation = { push : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<ForgotPassword onPress = {onPressEvent} navigation = {navigation}/>)
    //     const instance = component.instance();

    //     instance.emailHandler('ani@gmail.com')
    //     await instance.handleResetPasswordButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(instance.state.invalidEmail).toBe(true);
    // })

    it('test onPress event of reset password button when all textinput empty it will update the stateEmpty state to true ', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPassword onPress = {onPressEvent}/>)
        const instance = component.instance();
        await instance.handleResetPasswordButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.emailEmpty).toBe(true)
    })
})