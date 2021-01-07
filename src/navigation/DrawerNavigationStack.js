import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NoteScreen from '../components/dashboard/NoteScreen';

import DrawerContent from '../components/dashboard/DrawerContent'
import DeletedScreen from '../components/dashboard/DeletedScreen';
import SearchNotesScreen from '../components/dashboard/SearchNotesScreen';
import LabelNoteScreen from '../components/dashboard/LabelNoteScreen';
import ArchiveNoteScreen from '../components/dashboard/ArchiveNoteScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigatorStack() {
    return(
        <Drawer.Navigator drawerContent = {props => <DrawerContent navigation = {props}/>}>
            <Drawer.Screen name = 'Notes' component = {NoteScreen} />
            <Drawer.Screen name = 'Deleted' component = {DeletedScreen} />
            <Drawer.Screen name = 'SearchNote' component = {SearchNotesScreen} />
            <Drawer.Screen name = 'labelNote' component = {LabelNoteScreen} />
            <Drawer.Screen name = 'archiveNote' component = {ArchiveNoteScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigatorStack;