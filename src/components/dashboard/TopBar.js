import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Appbar, Avatar} from 'react-native-paper';
import { Strings } from '../../Language/Strings';
import TopBarStyle from '../../styles/TopBar.style';

export default class TopBar extends Component {
    constructor(props) {
        super(props);
    }

    handleMenuButton = async () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer();
        //onPress();
    }

    render() {
        return (
            <View>
                <Appbar style = {TopBarStyle.container}>
                    <Appbar.Action
                        icon = 'menu'
                        onPress = {this.handleMenuButton}
                        />
                    <Appbar.Content
                        titleStyle = {TopBarStyle.appbar_content_style}
                        title = {Strings.searchYourNotes}
                        />
                    <Appbar.Action
                        style = {{marginRight : 10}}
                        icon = {(this.props.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                        onPress={this.props.onPressView}
                        />
                    <TouchableOpacity
                        style = {TopBarStyle.avatar_style}
                        onPress = {this.props.onPressProfile}>
                        <Avatar.Image size={24} 
                            source = {require('../../assets/blank-profile.png')} />
                    </TouchableOpacity>
                </Appbar>
            </View>
        )
    }
}