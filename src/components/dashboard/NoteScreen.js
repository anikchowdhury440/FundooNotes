import React, {Component} from 'react';
import { View} from 'react-native';
import NoteScreenStyle from '../../styles/NoteScreen.styles';
import TopBar from './TopBar';
import BottomBar from './Bottombar';
import NoteView from './NoteView';

export default class NoteScreen extends Component {
    constructor (props) {
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

    render() {
        return(
            <View style = {NoteScreenStyle.mainContainer}>
                <TopBar navigation = {this.props.navigation} onPress = {this.selectView} listView = {this.state.listView}/>
                <NoteView navigation = {this.props.navigation} listView = {this.state.listView}/>
                <BottomBar navigation = {this.props.navigation}/> 
            </View>
        )
    }
}