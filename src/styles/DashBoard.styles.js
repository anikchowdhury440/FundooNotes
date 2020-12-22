import { StyleSheet } from 'react-native';

const DashBoardStyle = StyleSheet.create({
    mainContainer : {
        flex : 1,
        backgroundColor : 'white'
    },

    container : {
        backgroundColor : 'white',
        marginLeft : 20,
        marginRight : 20,
        marginTop : 10,
        marginBottom : 20,
        borderRadius : 10,
        borderWidth : 1,
        borderColor : '#CACFD2'
    },

    appbar_content_style : {
        fontSize: 18
    },

    bottombar_view : {
        width: '100%',  
        backgroundColor : 'white',
        position: 'absolute',
        bottom : 0
    },

    bottombar : {
        backgroundColor : 'white',
        borderWidth : 1,
        borderColor : '#CACFD2'
    },

    avatar_style : {
        marginRight : 15, 
        marginLeft : 5
    }
})

export default DashBoardStyle;