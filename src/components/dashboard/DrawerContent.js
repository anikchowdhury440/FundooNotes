import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Drawer } from 'react-native-paper';
import DrawerContentStyle from '../../styles/DrawerContent.styles';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Strings } from '../../Language/Strings';

export default class DrawerContent extends Component {
    constructor(props) {
      super(props)
    }

    handleNoteIconButton = () => {
      const {onPress} = this.props
      this.props.navigationProps.navigation.push('Home', { screen : 'Notes'})
      onPress();
    }

    handleDeletedIconButton = () => {
      const {onPress} = this.props
      this.props.navigationProps.navigation.push('Home', { screen : 'Deleted'})
      onPress();
    }

    render() {
      return (
        <View style = {{flex : 1}}>
          <DrawerContentScrollView>
              <Text style = {DrawerContentStyle.app_name}>{Strings.FundooNotes}</Text>
              <Drawer.Section style = {DrawerContentStyle.drawer_section_style}>
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'lightbulb-outline'
                  label = {Strings.notes}
                  onPress = {this.handleNoteIconButton}
                />
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'bell-outline'
                  label = {Strings.reminder}
                />
              </Drawer.Section>

              <Drawer.Section style = {DrawerContentStyle.drawer_section_style}>
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'plus'
                  label = {Strings.createNewLabel}
                />
              </Drawer.Section>

              <Drawer.Section style = {DrawerContentStyle.drawer_section_style}>
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'archive-arrow-down-outline'
                  label = {Strings.archieve}
                />

                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'delete'
                  label = {Strings.deleted}
                  onPress = {this.handleDeletedIconButton}
                />
              </Drawer.Section>

              <Drawer.Section>
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'cog-outline'
                  label = {Strings.settings}
                />

                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'help'
                  label = {Strings.help}
                />
              </Drawer.Section>
          </DrawerContentScrollView> 
        </View>       
      );
    }
}

// export default DrawerContent
  
