import React from 'react';
import {shallow} from 'enzyme';
import Profile from '../src/components/dashboard/Profile';
import UserServices from '../services/UserServices';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native'
import {Button} from 'react-native-paper'

describe('test Profile', () => {
    it('should match to snapshot', () => {
        const component = shallow(<Profile />)
        expect(component).toMatchSnapshot();
    })

    it('test componentDidMount for Profile Component', async () => {
        const component = shallow(<Profile />)
        const instance = component.instance();
        await instance.componentDidMount();
        UserServices.readUserDataFromRealtimeDatabase('QvtrCiQfg5YpagwmYMiczn3AlPk1').then(data => expect(instance.state.userDetails).notToBe(''))
    })

    it('test onPress event of logout button it will navigate to Login Screen', async () => {
        const navigation = { push : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<Profile onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        await instance.handleLogoutButton();
        expect(navigation.push).toBeCalledWith('Login')
    })

    it('test component in Profile component', () => {
        const component = shallow(<Profile/>)
        expect(component.find(ImageBackground)).toHaveLength(1)
        expect(component.find(Text)).toHaveLength(6)
        expect(component.find(Button)).toHaveLength(1)
        expect(component.find(TouchableOpacity)).toHaveLength(1)
    })

})