import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NoteScreen from '../components/dashboard/NoteScreen';

import DrawerContent from '../components/dashboard/DrawerContent'
import DeletedScreen from '../components/dashboard/DeletedScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigatorStack() {
    return(
        <Drawer.Navigator drawerContent = {props => <DrawerContent navigationProps = {props}/>}>
            <Drawer.Screen name = 'Notes' component = {NoteScreen} />
            <Drawer.Screen name = 'Deleted' component = {DeletedScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigatorStack;