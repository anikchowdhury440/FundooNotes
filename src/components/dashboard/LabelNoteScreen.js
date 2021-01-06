import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { Appbar } from 'react-native-paper'
import LabelNoteScreenStyle from '../../styles/LabelNoteScreen.styles'
import BottomBar from './Bottombar'

export default class LabelNoteScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listView : true
        }
    }

    selectView = async () => {
        await this.setState({
            listView : !this.state.listView
        })
    }

    handleMenuIconButton = () => {
        this.props.navigation.openDrawer();
    }

    handleSearchIconButton = () => {
        this.props.navigation.navigate('Home', { screen : 'SearchNote'})
    }

    render() {
        return (
            <View style = {LabelNoteScreenStyle.mainContainer}>
                <View>
                    <Appbar style = {{backgroundColor : 'transparent'}}>
                        <Appbar.Action 
                            style = {{marginLeft : 10}}
                            icon = 'menu'
                            onPress = {this.handleMenuIconButton}/>
                        <Appbar.Content 
                            title = {this.props.route.params.labels.label}/>
                        <Appbar.Action
                            style = {{marginRight : 10}}
                            icon = 'magnify'
                            onPress = {this.handleSearchIconButton}/>
                        <Appbar.Action
                            style = {{marginRight : 10}}
                            icon = {(this.state.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                            onPress={this.selectView}
                        />
                        <Appbar.Action
                            icon = 'dots-vertical' />
                    </Appbar>
                </View>
                <BottomBar navigation = {this.props.navigation}/> 
            </View>
        )
    }
}