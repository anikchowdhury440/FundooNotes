import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import DashBoard from '../components/dashboard/DashBoard';

import {DrawerContent} from '../components/dashboard/DrawerContent'

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return(
        <NavigationContainer>
            <Drawer.Navigator drawerContent = {props => <DrawerContent {...props}/>}>
                <Drawer.Screen name = 'Notes' component = {DashBoard} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigator;