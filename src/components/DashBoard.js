import React, {Component} from 'react';
import { View } from 'react-native';
import { Appbar} from 'react-native-paper';
import DashBoardStyle from '../styles/DashBoard.styles';

export default class HeaderToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView : true
        }
    }

    selectView = async () => {
        if(this.state.listView) {
            await this.setState({
                listView : false
            })
        }
        else {
            await this.setState({
                listView : true
            })
        }
    }

    render() {
        return(
            <View>
                <View>
                    <Appbar style = {DashBoardStyle.container}>
                        <Appbar.Action
                            icon = 'menu'
                            onPress={() => console.log('Pressed button')}
                            />
                        <Appbar.Content
                            titleStyle = {DashBoardStyle.appbar_content_style}
                            title = "Search your notes"
                            onPress={() => console.log('Pressed button')}
                            />
                        <Appbar.Action
                            icon = {this.state.listView ? 'view-grid-outline' : 'view-agenda-outline'}
                            onPress={this.selectView}
                            />
                        <Appbar.Action
                            style = {{ borderWidth : 1}}
                            onPress={() => console.log('Pressed button')}
                            />
                    </Appbar>
                </View>
                
            </View>
        )
    }
}