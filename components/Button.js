import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Button = (props) => {
    const onPressHandler = () => {
        props.onPress();
    };
    return (
        <TouchableOpacity activeOpacity={0.07}  style={[styles.btn, { backgroundColor: `${props.color}` }]} onPress={onPressHandler}>
        <Text style={styles.btnStyleFonts}>{props.title}</Text>
      </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    btn: {
      zIndex: 200,
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        padding: 10,
        marginVertical: '8%',
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        elevation: 3,
      },
      btnStyleFonts: {
        fontFamily: 'Inter-SemiBoldItalic',
        fontSize: 20,
      }
});
export default Button;