import React,{Component} from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity,Platform,ScrollView,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {deletePlace} from '../../store/actions/index';

class PlaceDetail extends Component {
    state={
        viewMode:"portrait"
    }
    constructor(props){
        super(props);
        Dimensions.addEventListener("change",this.updateStyles);
    }
    updateStyles=(dims)=>{
           this.setState({
               viewMode:dims.window.height > 500 ? "portrait" : "landscape"
           });
    };
    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);
    }
    placeDeletedHandler = () => {
          this.props.onDeletePlace(this.props.selectedPlace.key);
          this.props.navigator.pop();
    }
    render() {
        return (
        <View style={[styels.Container,
                     this.state.viewMode==="portrait" 
                     ? styels.portraitContainer
                     :styels.landscapeContainer ]} 
        >
            <View style={styels.subContainer}>
              <Image source={this.props.selectedPlace.image} style={styels.placeImage} />
            </View> 
            <View style={styels.subContainer}>
                 <View>
                     <Text style={styels.placeName}>{this.props.selectedPlace.name}</Text>
                 </View>
                 <View>
                     <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styels.Button}>
                            <Icon size={30} name={Platform.OS==='android' ? "md-trash":"ios-trash"} color="red" />
                        </View>
                     </TouchableOpacity>
                 </View>
            </View>  
        </View>
        );
    }
}

const styels=StyleSheet.create({
    Container:{
        margin:22,
        flex:1
    },
    portraitContainer:{
        flexDirection:"column"
    },
    landscapeContainer:{
        flexDirection:"row"
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
    },
    subContainer:{
        flex:1,
    }

});


const mapDispatchToProps = dispatch =>{
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
};
export default connect(null,mapDispatchToProps)(PlaceDetail);