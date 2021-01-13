// import React from 'react';
// import {shallow} from 'enzyme';
// import NoteCard from '../src/components/dashboard/NoteCard';

// describe('test NoteCard', () => {
//     it('should match to snapshot', () => {
//         const component = shallow(<NoteCard />)
//         expect(component).toMatchSnapshot();
//     })

//     it('test onPress event of selectNote it will navigate to AddNote Screen', async () => {
//         const navigation = { push : jest.fn() }
//         const onPressEvent = jest.fn();
//         const component = shallow(<NoteCard onPress = {onPressEvent} navigation = {navigation} />)
//         const instance = component.instance();
//         await instance.selectNote();
//         expect(onPressEvent).toHaveBeenCalled();
//     })

// })