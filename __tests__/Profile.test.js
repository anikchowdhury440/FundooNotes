// import React from 'react';
// import {shallow} from 'enzyme';
// import Profile from '../src/components/dashboard/Profile';
// import UserServices from '../services/UserServices';
// import {View, Text, ImageBackground, TouchableOpacity} from 'react-native'
// import {Button} from 'react-native-paper'

// describe('test Profile', () => {
//     it('should match to snapshot', () => {
//         const component = shallow(<Profile />)
//         expect(component).toMatchSnapshot();
//     })

//     // it('test onPress event of logout button it will navigate to Login Screen', async () => {
//     //     const navigation = { push : jest.fn() }
//     //     const onPressEvent = jest.fn();
//     //     const component = shallow(<Profile onPress = {onPressEvent} navigation = {navigation}/>)
//     //     const instance = component.instance();
//     //     await instance.handleLogoutButton();
//     //     expect(onPressEvent).toHaveBeenCalled();
//     //     return UserServices.signout.then(user => expect(navigation.push).toBeCalledWith('Login'))
//     // })

//     it('test component in Profile component', () => {
//         const component = shallow(<Profile/>)
//         expect(component.find(ImageBackground)).toHaveLength(1)
//         expect(component.find(Text)).toHaveLength(2)
//         expect(component.find(Button)).toHaveLength(1)
//         expect(component.find(TouchableOpacity)).toHaveLength(1)
//     })

//     it('test onpress event of image edit buttton it will call the RBSheet open method', async () => {
//         const RBSheet = { open : jest.fn() }
//         const onPressEvent = jest.fn();
//         const component = shallow(<Profile onPress = {onPressEvent} RBSheet = {RBSheet}/>)
//         const instance = component.instance();
//         await instance.handleImageEditButton();
//         expect(onPressEvent).toHaveBeenCalled();
//         expect(RBSheet.open).toHaveBeenCalled();
//     })

//     it('test onpress event of close buttton it will call the RBSheet close method', async () => {
//         const RBSheet = { close : jest.fn() }
//         const onPressEvent = jest.fn();
//         const component = shallow(<Profile onPress = {onPressEvent} RBSheet = {RBSheet}/>)
//         const instance = component.instance();
//         await instance.handleCancel();
//         expect(onPressEvent).toHaveBeenCalled();
//         expect(RBSheet.close).toHaveBeenCalled();
//     })

// })