import React from 'react';
import {Modal,View,Image,Text,Button,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const placeDetail = props => {
    let modalContent =null;
    if(props.selectedPlace){
        modalContent = (
            <View>
              <Image source={props.selectedPlace.image} style={styels.placeImage} />
              <Text style={styels.placeName}>{props.selectedPlace.name}</Text>
            </View>
        );
    }
    return (
        <Modal onRequestClose={props.onModalClosed} visible={props.selectedPlace !== null} animationType="slide">
            <View style={styels.modalContainer}>
              {modalContent}
            </View>
            <View>
              <TouchableOpacity onPress={props.onItemDeleted}>
                  <View style={styels.Button}>
                    <Icon size={30} name="ios-trash" color="red" />
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.onModalClosed}>
                  <View style={styels.Button}>
                    <Icon size={50} name="ios-close-circle" color="black" />
                  </View>
              </TouchableOpacity>
             {/* <Button title="Close" onPress={props.onModalClosed}/> */}
            </View>
        </Modal>
    );   
}

const styels=StyleSheet.create({
    modalContainer:{
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