import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import { Drawer } from 'react-native-paper';
import DrawerContentStyle from '../../styles/DrawerContent.styles';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Strings } from '../../Language/Strings';
import { connect } from 'react-redux'

class DrawerContent extends Component {
    constructor(props) {
      super(props)
    }

    handleNoteIconButton = () => {
      const {onPress} = this.props
      this.props.navigation.navigation.push('Home', { screen : 'Notes'})
      //onPress();
    }

    handleDeletedIconButton = () => {
      const {onPress} = this.props
      this.props.navigation.navigation.push('Home', { screen : 'Deleted'})
      //onPress();
    }

    handleCreateNewLabelButton = () => {
      this.props.navigation.navigation.push('CreateLabel')
    }

    handleEditButton = () => {
      this.props.navigation.navigation.push('CreateLabel')
    }

    handleArchiveButton = () => {
      this.props.navigation.navigation.push('Home', { screen : 'archiveNote'})
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
                  onPress = {() => this.props.navigation.navigation.navigate('Home', { screen : 'reminderNote'})}
                />
              </Drawer.Section>

              <Drawer.Section style = {DrawerContentStyle.drawer_section_style}>
                {
                  (this.props.state.createLabelReducer.userLabel.length > 0) ? 
                    <View style = {DrawerContentStyle.label_edit_style}>
                      <Text>LABELS</Text>
                      <TouchableWithoutFeedback
                        onPress = {this.handleEditButton}>
                        <Text style = {{marginLeft : 130}}>EDIT</Text>
                      </TouchableWithoutFeedback>
                    </View>
                    :
                    null
                }
                {
                  (this.props.state.createLabelReducer.userLabel.length > 0)
                    ?    
                    this.props.state.createLabelReducer.userLabel.map(labels => (
                        <React.Fragment key = {labels.label_id}>
                          <Drawer.Item
                            style = {DrawerContentStyle.drawer_item_style}
                            icon = 'label-outline'
                            label = {labels.label_name}
                            onPress = {() => this.props.navigation.navigation.push('Home', { screen : 'labelNote', params : {labels : labels}})}
                          />
                        </React.Fragment>
                      ))
                    :
                    null
                }
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'plus'
                  label = {Strings.createNewLabel}
                  onPress = {this.handleCreateNewLabelButton}
                />
              </Drawer.Section>

              <Drawer.Section style = {DrawerContentStyle.drawer_section_style}>
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'archive-arrow-down-outline'
                  label = {Strings.archive}
                  onPress = {this.handleArchiveButton}
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

const mapStateToProps = state => {
  return { state }
}

export default connect(mapStateToProps)(DrawerContent)

  
