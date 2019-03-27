import React, {Component} from 'react';
import {StyleSheet,View, ToastAndroid} from 'react-native';

import PlaceInput from './src/component/PlaceInput/PlaceInput';
import PlaceList from './src/component/PlaceList/PlaceList';
//import placeIamge from './src/assets/dp.jpg';
import PlaceDetail from './src/component/PlaceDetail/PlaceDetail';

export default class App extends Component {
  state ={
    places:[],
    selectedPlace:null

  };
  placeAddedHandler = placeName =>{
    this.setState(prevState =>{
      return {
        places:prevState.places.concat({
          key: Math.random().toString(),
          name: placeName,
          image: {
            uri:"https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681"
          }
        })
      };
    });
  };  
  placeDeletedHandler = ()=>{
    this.setState(prevState => {
      ToastAndroid.show("Successfully Deleted", ToastAndroid.SHORT)
      return{
        places:prevState.places.filter(place=>{
          return place.key !==prevState.selectedPlace.key;
        }),
        selectedPlace: null
      };
    });
  };
  modalClosedHandler = ()=>{
    this.setState({
      selectedPlace:null
    });
  };
  placeSelectedHandler = key => {
    this.setState(prevState =>{
      return {
        selectedPlace: prevState.places.find(place =>{
          return place.key===key;
        })
      };
    });
  };
  render(){
    return(
      <View style={styles.container}>
        <PlaceDetail 
            selectedPlace={this.state.selectedPlace} 
            onItemDeleted={this.placeDeletedHandler}
            onModalClosed={this.modalClosedHandler}
        />
        <PlaceInput 
            onPlaceAdded={this.placeAddedHandler} 
        />
        <PlaceList 
            places = {this.state.places} 
            onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}     
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:26,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#fff",
  },
});

