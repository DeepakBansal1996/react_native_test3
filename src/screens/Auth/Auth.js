import React,{ Component} from 'react';
import {View , Text , Button,TextInput,StyleSheet,ImageBackground,Dimensions} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../component/UI/DefaultInput/DefaultInput';
import HeadingText from '../../component/UI/HeadingText/HeadingText';
import MainTetx from '../../component/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBg from '../../component/UI/ButtonWithBg/ButtonWithBg';

class AuthScreen extends Component {
    state={
       viewMode: Dimensions.get('window').height >500 ? "portrait" : "landscape"
    };
    constructor(props){
        super(props);
        Dimensions.addEventListener("change",this.updateStyles);
    }
    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);
    }

    updateStyles=(dims)=>{
        this.setState({
            viewMode:dims.window.height >500 ? "portrait" : "landscape"
        })
    }
    loginHandler =() => {
        startMainTabs();
    }
    render(){
        let headingText=null;
        if(this.state.viewMode==="portrait"){
            headingText=(
                <MainTetx>
                <HeadingText>Please Log In</HeadingText>
             </MainTetx>
            )
        }
        return(
           <ImageBackground source={backgroundImage} style={styles.bgImage}>
               <View style={styles.container}>
                  {headingText}
                  <ButtonWithBg color="#29aaf4" onPress={()=>alert("wait for some time")}>Switch to Sign In</ButtonWithBg> 
                  <View style={styles.inputConatiner}>
                     <DefaultInput 
                          placeholder="Your E-Mail Address"
                          style={styles.input} 
                      />
                     <View 
                        style={this.state.viewMode==="portrait"
                               ? styles.portraitPasswordContainer 
                               : styles.landscapePasswordContainer}>

                          <View style={this.state.viewMode==="portrait" 
                                      ? styles.portraitPasswordWrapper
                                      : styles.landscapePasswordWrapper}>
                              <DefaultInput 
                                placeholder="Password"
                                style={styles.input}
                           />
                          </View>
                          <View style={this.state.viewMode==="portrait" 
                                      ? styles.portraitPasswordWrapper
                                      : styles.landscapePasswordWrapper}>
                            <DefaultInput  
                               placeholder="Confirm Password"
                               style={styles.input}
                           />
                          </View>
                     </View>
                     
                    </View>
                      <ButtonWithBg color="#29aaf4" onPress={this.loginHandler}>Sign Up</ButtonWithBg> 
                    </View>
          </ImageBackground>
        );
    }
}
const styles=StyleSheet.create({
    container:{
       flex:1,
       justifyContent:"center",
       alignItems:"center",
    },
    inputConatiner:{
        width:"80%"
    },
    bgImage:{
       width:"100%",
       flex:1
    },
    input:{
        backgroundColor:"#eee",
        borderColor:"#bbb",
        borderRadius:5
    
    },
    landscapePasswordContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    portraitPasswordContainer:{
        flexDirection:"column",
        justifyContent:"flex-start"
    },
    landscapePasswordWrapper:{
        width: "45%"
    },
    portraitPasswordWrapper:{
        width: "100%"
    }
});
export default AuthScreen;