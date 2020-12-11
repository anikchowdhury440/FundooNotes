import React from 'react';
import {shallow} from 'enzyme';

import Login from '../src/components/Login'

describe('test Login', () => {
    it('test when render should match to snapshot', () => {
        const component = shallow(<Login/>)
        expect(component).toMatchSnapshot();
    })

    it('test the email handler method should update email state', () => {
        const component = shallow(<Login/>)
        expect(component.instance().state.email).toBe('')
        component.instance().emailHandler('anik@gmail.com')
        expect(component.instance().state.email).toBe('anik@gmail.com')
    })

    it('test the password handler method should update password state', async () => {
        const component = shallow(<Login/>)
        expect(component.instance().state.password).toBe('')
        component.instance().passwordHandler('Anik#1998')
        expect(component.instance().state.password).toBe('Anik#1998')
    })

    it('test when email correct email validation state will be true', () => {
        const component = shallow(<Login/>)
        component.instance().setState({ email : 'anik@gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(true)
    })

    it('test when email incorrect email validation state will be false', () => {
        const component = shallow(<Login/>)
        component.instance().setState({ email : 'anik.@gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(false)
    })

    it('test when password correct password validation state will be true', () => {
        const component = shallow(<Login/>)
        component.instance().setState({ password : 'Anik#1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(true)
    })

    it('test when password incorrect password validation state will be false', () => {
        const component = shallow(<Login/>)
        component.instance().setState({ password : 'anik1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(false)
    })

    // it('test onPress event of eye icon called it will change the secureTextPassword State', () => {
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<Login onPress = {onPressEvent}/>)
    //     expect(component.instance().state.secureTextPassword).toBe(true);
    //     component.instance().handleSecureTextPassword();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(onPressEvent).toHaveBeenCalledTimes(1);
    //     expect(component.instance().state.secureTextPassword).toBe(false);
    //     component.instance().handleSecureTextPassword();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(onPressEvent).toHaveBeenCalledTimes(2);
    //     expect(component.instance().state.secureTextPassword).toBe(true);
    // })
})