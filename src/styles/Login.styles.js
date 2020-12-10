import { StyleSheet } from 'react-native';

const LoginStyle = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent: 'center',
        alignItems : 'center'
    },

    signin_container : {
        backgroundColor : 'white',
        width : '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius : 10
    },

    signin_text : {
        paddingTop : 20,
        paddingBottom : 20,
        alignSelf : 'center',
        fontWeight : 'bold',
        fontSize : 20
    },

    textinput_style : {
        borderWidth : 1,
        marginBottom : 20,
        marginLeft : 25,
        marginRight : 25,
        borderColor : '#D3D3D3',
        paddingLeft : 10,
        paddingRight : 10,
        borderRadius : 10
    },

    signin_button_styles : {
        width : '50%',
        marginBottom : 20,
        backgroundColor : "#339EFF",
        alignSelf : 'center',
        borderRadius : 20
    },

    signin_button_text : {
        alignSelf : "center",
        color : 'white',
        fontSize : 17,
        padding : 10,
    },

    signup_block : {
        flexDirection : "row",
        justifyContent : "center",
        marginBottom : 20,
    },

    signup_text : {
        color : "#339EFF",
        fontWeight : 'bold'
    },

    text_style : {
        fontSize : 20,
    }
});

export default LoginStyle