import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DashBoard from '../components/dashboard/DashBoard';

import DrawerContent from '../components/dashboard/DrawerContent'
import Remainder from '../components/dashboard/Remainder';

const Drawer = createDrawerNavigator();

function DrawerNavigator({props}) {
    return(
        <Drawer.Navigator drawerContent = {props => <DrawerContent {...props}/>}>
            <Drawer.Screen name = 'Notes' component = {DashBoard} />
            <Drawer.Screen name = 'Reminder' component = {Remainder} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;