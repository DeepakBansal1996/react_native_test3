import React from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const placeDetail = props => {
    return (
            <View style={styels.Container}>
               <View>
                 <Image source={props.selectedPlace.image} style={styels.placeImage} />
                 <Text style={styels.placeName}>{props.selectedPlace.name}</Text>
               </View>   
               <View>
                  <TouchableOpacity onPress={props.onItemDeleted}>
                    <View style={styels.Button}>
                       <Icon size={30} name="ios-trash" color="red" />
                    </View>
                  </TouchableOpacity>
                 {/* <TouchableOpacity onPress={props.onModalClosed}>
                    <View style={styels.Button}>
                      <Icon size={50} name="ios-close-circle" color="black" />
                    </View>
                 </TouchableOpacity> */}
                </View>
            </View>
    );   
};

const styels=StyleSheet.create({
    Container:{
        margin:22
    },
    placeImage:{
        width:"100%",
        height:200
    },
    placeName:{
        fontWeight:"bold",
        textAlign:"center",
        fontSize:28
    },
    Button:{
        alignItems:"center"
    }

});

export default placeDetail;