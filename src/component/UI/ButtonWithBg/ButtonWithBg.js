import React from 'react';
import {TouchableOpacity,View,Text,StyleSheet,Platform,TouchableNativeFeedback} from 'react-native';


const buttonWithBg = (props)=>{
    const content = (
        <View style={[styles.button, {backgroundColor:props.color}, props.disabled ? styles.disabled : null]}>
        <Text style={[{fontWeight:'bold'}, props.disabled ? styles.disabledText : null]} >
             {props.children}
        </Text>
    </View>
    );
    if(props.disabled){
        return content;
    }
    if(Platform.OS==="android"){
        return(
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        );
    } 
    <TouchableOpacity onPress={props.onPress}>
        {content}
    </TouchableOpacity>
};
    
    

const styles=StyleSheet.create({
    button:{
        padding:10,
        margin:5,
        borderRadius:5,
        borderWidth:1,
        borderColor:"black"
        
    },
    disabled:{
        backgroundColor: "#eee",
        borderColor: "#aaa"
    },
    disabledText: {
        color:"#aaa"
    }
});
export default buttonWithBg;