import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NoteScreen from '../components/dashboard/NoteScreen';

import DrawerContent from '../components/dashboard/DrawerContent'
import Reminders from '../components/dashboard/ReminderScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigatorStack() {
    return(
        <Drawer.Navigator drawerContent = {props => <DrawerContent props = {props}/>}>
            <Drawer.Screen name = 'Notes' component = {NoteScreen} />
            <Drawer.Screen name = 'Reminder' component = {Reminders} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigatorStack;