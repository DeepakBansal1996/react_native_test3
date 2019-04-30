import React,{ Component} from 'react';
import { connect } from 'react-redux';
import {View ,StyleSheet,ImageBackground,Dimensions,KeyboardAvoidingView,CheckBox,Text} from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../component/UI/DefaultInput/DefaultInput';
import HeadingText from '../../component/UI/HeadingText/HeadingText';
import MainTetx from '../../component/UI/MainText/MainText';
import backgroundImage from '../../assets/background.png';
import ButtonWithBg from '../../component/UI/ButtonWithBg/ButtonWithBg';
import validate from '../../utility/validation';
import { tryAuth } from '../../store/actions/index';
import navigationTopBar from '../../component/UI/navigationTopBar/navigationTopBar';

class AuthScreen extends Component {
    static navigatorStyle = navigationTopBar;

    state={
       viewMode: Dimensions.get('window').height >500 ? "portrait" : "landscape",
       authMode: "login",
       check:false,
       controls:{
           email:{
              value:"",
              valid:false,
              validationRules:{
                  isEmail:true
              },
              touched : false
           },
           password:{
            value:"",
            valid:false,
            validationRules:{
                minLength:6
            },
            touched : false
         },
           confirmPassword:{
            value:"",
            valid:false,
            validationRules:{
                equalTo:'password'
            },
            touched : false
         }
       }
    };
    constructor(props){
        super(props);
        Dimensions.addEventListener("change",this.updateStyles);
    }
    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);
    };
    
    switchauthModeHandler = () => {
        this.setState(prevState =>{
            return{
                authMode: prevState.authMode === "login" ? "signup" : "login"
            };
        });
    };
    updateStyles=(dims)=>{
        this.setState({
            viewMode:dims.window.height >500 ? "portrait" : "landscape"
        })
    };

    loginHandler =() => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onLogin(authData);
        fetch('deepak-bansal',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)  
        }).then(res => res.json())
          .then(resJson => console.log("json data",resJson))
          .catch(error => console.error("error",error))
        startMainTabs();
    };

    updateInputState = (key, value)=> {
        let connectedValue={};
        if(this.state.controls[key].validationRules.equalTo) {
            const equalControl =  this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
             connectedValue = {
                 ...connectedValue,
                 equalTo: equalValue
             }; 
        }
        if(key === 'password'){
             connectedValue = {
                 ...connectedValue,
                 equalTo: value
             }; 
        }
        this.setState(prevState => {
            return {
                controls:{
                      ...prevState.controls,//copying all the previous state
                      confirmPassword : {
                        ...prevState.controls.confirmPassword,
                        valid: key==='password' ? validate(prevState.controls.confirmPassword.value,
                                                          prevState.controls.confirmPassword.validationRules,
                                                          connectedValue)
                                                :  prevState.controls.confirmPassword.valid
                       } ,    
                      [key]:{
                          ...prevState.controls[key],
                          value:value,
                          valid : validate(value, prevState.controls[key].validationRules,connectedValue),
                          touched: true
                      }, 
                }
            };
        });
    };
    onCheckBox=()=>{
        this.setState({
            check:!this.state.check
        })
    };

    render(){
        let headingText=null;
        let confirmPasswordControl = null;
        if(this.state.viewMode==="portrait"){
            headingText=(
                <MainTetx>
                <HeadingText>Please Log In</HeadingText>
             </MainTetx>
            );
        }
        if(this.state.authMode === "signup"){
            confirmPasswordControl = (    
                        <View 
                            style={this.state.viewMode==="portrait" 
                                  ? styles.portraitPasswordWrapper
                                  : styles.landscapePasswordWrapper} >
                            <DefaultInput  
                                placeholder="Confirm Password"
                                style={styles.input}
                                value={this.state.controls.confirmPassword.value}
                                onChangeText={(val)=> this.updateInputState('confirmPassword',val)}
                                valid = {this.state.controls.confirmPassword.valid}
                                touched = {this.state.controls.confirmPassword.touched}
                                secureTextEntry
                            />
                        </View>
                    );
        }
        return(
           <ImageBackground source={backgroundImage} style={styles.bgImage}>
               <KeyboardAvoidingView style={styles.container} behavior="padding" >
                  {headingText}
                  <ButtonWithBg color="#29aaf4" onPress={this.switchauthModeHandler} >
                        Switch to {this.state.authMode === 'login' ? "Sign Up" : "Sign In" }
                  </ButtonWithBg> 
                  <View style={styles.inputConatiner}>
                     <DefaultInput 
                          placeholder="Your E-Mail Address"
                          style={styles.input} 
                          value={this.state.controls.email.value}
                          onChangeText={(val)=> this.updateInputState('email',val)}
                          valid = {this.state.controls.email.valid}
                          touched = {this.state.controls.email.touched}
                          autoCapitalize = "none"
                          autoCorrect = {false}
                          keyboardType="email-address"
                          returnKeyType="next"
                          onSubmitEditing = {() => this.refs.textPassword.focus()}
                      
                      />
                     <View 
                        style={this.state.viewMode==="portrait" || 
                               this.state.authMode === 'login'
                               ? styles.portraitPasswordContainer 
                               : styles.landscapePasswordContainer}>

                          <View style={this.state.viewMode==="portrait" || 
                                      this.state.authMode === 'login'
                                      ? styles.portraitPasswordWrapper
                                      : styles.landscapePasswordWrapper}>
                              <DefaultInput 
                                placeholder="Password"
                                style={styles.input}
                                value={this.state.controls.password.value}
                                onChangeText={(val)=> this.updateInputState('password',val)}
                                valid = {this.state.controls.password.valid}
                                touched = {this.state.controls.password.touched}
                                secureTextEntry
                                returnKeyType="go"
                                refs={"textPassword"}
                               
                           />
                           <View style={{flexDirection:"row",alignItems:"center"}}>                           
                            <CheckBox 
                                  title='Remember me' 
                                  
                                  
                                  //style={{backgroundColor: 'white'}}
                                  value = {this.state.check} 
                                  onChange={()=>this.onCheckBox()}
                            />
                            <View style={{flexDirection:"row",alignItems:"center"}}> 
                            <Text style={{color:'white'}}>Remember me</Text></View>
                            <Text style={{color:'blue',paddingLeft:95,textDecorationLine: 'underline'}}>Touch ID</Text></View>
                          </View>
                          {confirmPasswordControl}
                     </View>
                     
                    </View>
                      <ButtonWithBg 
                          color="#29aaf4" 
                          onPress={this.lginHandler}
                          disabled={
                                    !this.state.controls.confirmPassword.valid &&
                                    this.state.authMode === "signup" ||
                                    !this.state.controls.password.valid ||
                                    !this.state.controls.email.valid} 
                        >
                          Sign Up
                      </ButtonWithBg> 
                    </KeyboardAvoidingView>
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
        height:"100%",
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

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin : (authData) => dispatch(tryAuth(authData))
    };
};

export default connect(null,mapDispatchToProps)(AuthScreen);