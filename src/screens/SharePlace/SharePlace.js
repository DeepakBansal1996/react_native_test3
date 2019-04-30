import React,{Component} from 'react';
import {Button,StyleSheet,ScrollView,KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import PlaceInput from '../../component/PlaceInput/PlaceInput';
import MainText from '../../component/UI/MainText/MainText';
import HeadingText from '../../component/UI/HeadingText/HeadingText';
import PickImage from '../../component/PickImage/PickImage';
import PickLocation from '../../component/PickLocation/PickLocation';
import validate from '../../utility/validation';


import { addPlace } from '../../store/actions/index';




class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor:"orange"
    }
    state={
        controls: {
            placeName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            }
        }
    };
    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEvent = event => {
        if(event.type==="NavBarButtonPress"){
            if(event.id==="sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }
    placeNameChangeHandler = (val) =>{
        this.setState(prevState =>{
            return {
               controls: {
                   ...prevState,
                   placeName: {
                       ...prevState.controls.placeName,
                       value: val,
                       valid: validate(val, prevState.controls.placeName.validationRules),
                       touched: true

                   }
               } 
            }
        });
    }
    placeAddedHandler = () =>{
        if(this.state.controls.placeName.value.trim() !== ""){
            this.props.onAddPlace(this.state.controls.placeName.value);
        }
    };
    render(){
        return(
            <ScrollView>
                <KeyboardAvoidingView style={styles.container} behavior="padding" >
                   <MainText>
                       <HeadingText>Share a Place with us!</HeadingText>
                    </MainText> 
                   <PickImage />
                   <PickLocation />
                   <PlaceInput 
                       placeData={this.state.controls.placeName} 
                       onChangeText={this.placeNameChangeHandler} 
                    />
                   <Button 
                       title="Share the Place!" 
                       onPress={this.placeAddedHandler}
                       disabled = {!this.state.controls.placeName.valid} 
                     />
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center"
    }
});
const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    }
}

export default connect(null,mapDispatchToProps)(SharePlaceScreen);