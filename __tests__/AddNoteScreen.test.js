// import React from 'react';
// import {shallow} from 'enzyme';
// import AddNoteScreen from '../src/components/dashboard/AddNoteScreen'
// import {Appbar, Snackbar} from 'react-native-paper'
// import RBSheet from 'react-native-raw-bottom-sheet'

// describe('test AddNoteScrren', () => {

//     it('should match to snapshot', () => {
//         const component = shallow(<AddNoteScreen />)
//         expect(component).toMatchSnapshot();
//     })

//     it('test when title provided in textinput should update title state', async () => {
//         const component = shallow(<AddNoteScreen/>)
//         expect(component.instance().state.title).toBe('')
//         component.instance().handleTitle('Good Morning')
//         expect(component.instance().state.title).toBe('Good Morning')
//     })

//     it('test when note provided in textinput should update note state', async () => {
//         const component = shallow(<AddNoteScreen/>)
//         expect(component.instance().state.note).toBe('')
//         component.instance().handleNote('Good Morning')
//         expect(component.instance().state.note).toBe('Good Morning')
//     })

//     it('test component in AddScreen component', () => {
//         const component = shallow(<AddNoteScreen/>)
//         expect(component.find(Appbar.Action)).toHaveLength(8)
//         expect(component.find(Appbar)).toHaveLength(2)
//         expect(component.find(Snackbar)).toHaveLength(1)
//     })

//     it('test onPress event of HandleDotIconButton it will call the RBSheet open function', async () => {
//         const RBSheet = {open : jest.fn()}
//         const onPressEvent = jest.fn();
//         const component = shallow(<AddNoteScreen onPress = {onPressEvent} RBSheet = {RBSheet} />)
//         const instance = component.instance();
//         await instance.handleDotIconButton();
//         expect(onPressEvent).toHaveBeenCalled();
//         expect(RBSheet.open).toHaveBeenCalled()
//     })

//     it('test onDismiss event of Snackbar for empty note delete it will set isNoteNotAddedDeleted to be false', async () => {
//         const onDismissEvent = jest.fn();
//         const component = shallow(<AddNoteScreen onDismiss = {onDismissEvent} />)
//         const instance = component.instance();
//         await instance.isNotAddedNoteDeletedSnackbarHandler();
//         expect(onDismissEvent).toHaveBeenCalled();
//         expect(instance.state.isNoteNotAddedDeleted).toBe(false)
//     })

//   //   it('test componentDidMount in AddScreen component', async () => {
//   //     const navigation = { push : jest.fn() }
//   //     const onPressEvent = jest.fn();
//   //     const component = shallow(<AddNoteScreen/>)
//   //     const instance = component.instance();
//   //     await instance.componentDidMount();
//   //     expect(instance.state.userId).notToBe('')
//   // })

// // it('test onPress event of back icon button when title and notes are not empty it will navigate to notes screen', async () => {
//   //     const navigation = { push : jest.fn() }
//   //     const onPressEvent = jest.fn();
//   //     const component = shallow(<AddNoteScreen onPress = {onPressEvent} navigation = {navigation}/>)
//   //     const instance = component.instance();
//   //     instance.handleTitle('Good Morning')
//   //     instance.handleNote('Good Morning')
//   //     await instance.handleBackIconButton();
//   //     expect(onPressEvent).toHaveBeenCalled();
//   //     expect(navigation.push).toBeCalledWith("Home");
//   // })

// // it('test onPress event of back icon button when title and notes empty it will navigate to notes screen', async () => {
//   //     const navigation = { push : jest.fn() }
//   //     const onPressEvent = jest.fn();
//   //     const component = shallow(<AddNoteScreen onPress = {onPressEvent} navigation = {navigation}/>)
//   //     const instance = component.instance();
//   //     await instance.handleBackIconButton();
//   //     expect(onPressEvent).toHaveBeenCalled();
//   //     expect(navigation.push).toBeCalledWith("Home");
//   // })

// })

// // describe("Testing Navigation when there is no parameter in Add Note Screen Component", () => {
// //   let component = null
// //   const spyPush = jest.fn()
// //   const props = {
// //     navigation: {
// //       push: spyPush,
// //       state: {}
// //     }
// //   }
// //   const params = {
// //     noteKey : 123, 
// //     notes : {
// //       note : 'Good Morning',
// //       title : 'Good Morning',
// //       isDeleted : false
// //     }
// //   }

// //   beforeEach(() => {
// //     component = shallow(<AddNoteScreen {...props} />)
// //     component.setState({ params: params })
// //   })

// //   it('should test navigation', async () => {
// //     await component.instance().handleBackIconButton(params)
// //   })
// // })