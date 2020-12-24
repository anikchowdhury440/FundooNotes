import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Drawer } from 'react-native-paper';
import DrawerContentStyle from '../../styles/DrawerContent.styles';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';

const DrawerContent = ({props}) => {

    return (
      <View style = {{flex : 1}}>
        <DrawerContentScrollView>
            <Text style = {DrawerContentStyle.app_name}>Fundoo Notes</Text>
            <Drawer.Section style = {DrawerContentStyle.drawer_section_style}>
              <Drawer.Item
                style = {DrawerContentStyle.drawer_item_style}
                icon = 'lightbulb-outline'
                label = "Notes"
                onPress = {() => props.navigation.navigate('Home', { screen: 'Notes' })}
              />
              <Drawer.Item
                style = {DrawerContentStyle.drawer_item_style}
                icon = 'bell-outline'
                label = "Reminders"
                onPress = {() => props.navigation.navigate('Home', { screen : 'Reminders'})}
              />
            </Drawer.Section>

            <Drawer.Section style = {DrawerContentStyle.drawer_section_style}>
              <Drawer.Item
                style = {DrawerContentStyle.drawer_item_style}
                icon = 'plus'
                label = "Create New Label"
              />
            </Drawer.Section>

            <Drawer.Section style = {DrawerContentStyle.drawer_section_style}>
              <Drawer.Item
                style = {DrawerContentStyle.drawer_item_style}
                icon = 'archive-arrow-down-outline'
                label = "Archieve"
              />

              <Drawer.Item
                style = {DrawerContentStyle.drawer_item_style}
                icon = 'delete'
                label = "Deleted"
              />
            </Drawer.Section>

            <Drawer.Section>
              <Drawer.Item
                style = {DrawerContentStyle.drawer_item_style}
                icon = 'cog-outline'
                label = "Setting"
              />

              <Drawer.Item
                style = {DrawerContentStyle.drawer_item_style}
                icon = 'help'
                label = "Help & feedback"
              />
            </Drawer.Section>
        </DrawerContentScrollView> 
      </View>       
    );
  
}

export default DrawerContent
  
