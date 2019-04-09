import React from 'react';
import {TouchableOpacity,View,Text,StyleSheet,Platform,TouchableNativeFeedback} from 'react-native';

const buttonWithBg = (props)=>{
    const content = (
        <View style={[styles.button, {backgroundColor:props.color}]}>
        <Text style={{fontWeight:'bold'}}>{props.children}</Text>
    </View>
    );
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
        
    }
});
export default buttonWithBg;