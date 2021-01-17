import { StyleSheet } from 'react-native';

const BottomBarStyle = StyleSheet.create({
    bottombar_view : {
        width: '100%',  
        backgroundColor : 'white',
        position: 'absolute',
        bottom : 0,
    },

    bottombar : {
        backgroundColor : 'white',
        borderWidth : 1,
        borderColor : '#CACFD2',
    },

    plus_button_style : {
        marginRight : '10%', 
        borderWidth : 2, 
        marginBottom : 60, 
        height : 60, 
        width : 60, 
        backgroundColor : 'white', 
        borderRadius : 30, 
        borderColor : '#CACFD2',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    bottom_bar_action_style : {
        marginRight : 10,
    }
    
})

export default BottomBarStyle;