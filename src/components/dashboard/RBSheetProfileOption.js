import React, {Component} from 'react';
import {View} from 'react-native'
import {Button} from 'react-native-paper'
import RBSheetProfileOptionStyle from '../../styles/RBSheetProfileOption.styles';

export default class RBSheetProfileOption extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View>
                <View style = {RBSheetProfileOptionStyle.button_view_style}>
                    <Button
                        onPress = {this.props.takePhoto}
                        style = {RBSheetProfileOptionStyle.button_style}
                        color = 'white'>
                            Take Photo
                    </Button>
                </View>
                <View style = {RBSheetProfileOptionStyle.button_view_style}>
                    <Button
                        onPress = {this.props.chooseFromLibrary}
                        style = {RBSheetProfileOptionStyle.button_style}
                        color = 'white'>
                            Choose From Library
                    </Button>
                </View>
                <View style = {RBSheetProfileOptionStyle.button_view_style}>
                    <Button
                        onPress = {this.props.cancel}
                        style = {RBSheetProfileOptionStyle.button_style}
                        color = 'white'>
                            Cancel
                    </Button>
                </View>
            </View>   
        )
    }
}