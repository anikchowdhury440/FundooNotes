import { StyleSheet } from 'react-native';

const LoginStyle = StyleSheet.create({
    image_view_style: {
        alignSelf : "center", 
        marginTop : 50, 
        borderWidth : 2, 
        borderRadius : 70
    },

    image_style: {
        width : 80, 
        height : 80, 
        margin : 20
    },

    container : {
        marginTop : 30,
        alignItems : "center",
        marginBottom : 100
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

    textinput_view_style : {
        borderWidth : 1, 
        borderColor : '#808080', 
        borderRadius : 10,
        alignSelf : "center",
        width : '80%',
        marginLeft : '10%',
        marginRight : '10%',
        flexDirection : 'row'
    },

    textinput_style : {
        paddingLeft : '5%',
        paddingRight : '5%',
        width : '100%',
        fontSize : 15
    },

    icon_style : {
        height : 35,
        width : 35,
        marginTop : 5,
        alignSelf : 'flex-end',
    },

    icon : {
        width : '13%'
    },

    password_textinput_style : {
        width : '85%'
    },

    text_error_style : {
        alignSelf : 'flex-end',
        marginRight : '10%',
        marginBottom : 10,
        color : 'red'
    },

    forgot_password_style : {
        alignSelf : 'flex-end',
        marginBottom : 20,
        marginRight : 25
    },

    forgot_password_text_style : {
        color : "#339EFF",
        fontWeight : 'bold'
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