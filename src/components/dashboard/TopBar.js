import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Appbar, Avatar} from 'react-native-paper';
import { Strings } from '../../Language/Strings';
import TopBarStyle from '../../styles/TopBar.style';

export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView : true
        }
    }

    selectView = async () => {
        const {onPress} = this.props
        await this.setState({
            listView : !this.state.listView
        })
        //onPress()
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
                        icon = {this.state.listView ? 'view-grid-outline' : 'view-agenda-outline'}
                        onPress={this.selectView}
                        />
                    <TouchableOpacity
                        style = {TopBarStyle.avatar_style}>
                        <Avatar.Image size={24} source={require('../../assets/app-logo.png')} />
                    </TouchableOpacity>
                </Appbar>
            </View>
        )
    }
}