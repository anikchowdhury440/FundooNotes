import { StyleSheet } from 'react-native';

const RegisterStyle = StyleSheet.create({
    container : {
        marginTop : 100,
        alignItems : "center",
        marginBottom : 100
    },

    signup_container : {
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

    signup_text : {
        paddingTop : 20,
        paddingBottom : 20,
        alignSelf : 'center',
        fontWeight : 'bold',
        fontSize : 20
    },

    textinput_style : {
        borderWidth : 1,
        marginBottom : 20,
        marginLeft : 20,
        marginRight : 20,
        borderColor : '#D3D3D3',
        paddingLeft : 10,
        paddingRight : 10,
        borderRadius : 10,
        fontWeight : 'bold',
        fontSize : 15
    },

    signup_button_styles : {
        width : '50%',
        marginBottom : 20,
        backgroundColor : "#339EFF",
        alignSelf : 'center',
        borderRadius : 20
    },

    signup_button_text : {
        alignSelf : "center",
        color : 'white',
        fontSize : 17,
        padding : 10,
    },

    signin_block : {
        flexDirection : "row",
        justifyContent : "center",
        marginBottom : 20,
    },

    signin_text : {
        color : "#339EFF",
        fontWeight : 'bold'
    }
})

export default RegisterStyle;