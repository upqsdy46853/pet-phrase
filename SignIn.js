import React from "react";
import {Text, StyleSheet, View, SafeAreaView, TouchableOpacity,Button} from 'react-native'
import { Input } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignIn extends React.Component{
  state = {
  }
  render(){
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.box}>
        <View style={styles.logoBox}>
          <Text style={styles.logo}>Pet Phrase</Text>
        </View>

        <View style={styles.inputBox}>
          <Input
          placeholder="帳號"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={
          <Icon name="user" size={20} color={'#4F4F4F'}/>
          }
          autoCapitalize="none"
          onChangeText={value => this.props.onUsernameChange(value)}
        />
          <Input
          placeholder="密碼"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          secureTextEntry={true}
          autoCapitalize="none"
          leftIcon={
          <Icon name="lock" size={20} color={'#4F4F4F'}/>
          }
          onChangeText={value => this.props.onPasswordChange(value)}
        />
        </View>


        <View style={styles.submitBox}>
          <TouchableOpacity style={styles.submit} onPress={this.props.signIn}>
            <Text style={{color:'white'}}>登入</Text>	
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.signUpBox}>
        <Text style={{color:'gray', alignItems:'center'}}>還沒有帳號？</Text>
        <TouchableOpacity onPress={()=>{console.log('hello')}} >
          <Text style={{color:'#0066CC'}}>註冊</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1 , 
    alignItems:'center',
  },  
  box: {
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    //backgroundColor:'yellow'
  },
  logoBox: {
    //backgroundColor:'green',
  },
  logo: {
    textAlign:'center',
    fontFamily:'SignPainter',
    fontWeight:'900',fontSize: 70,
    //backgroundColor:'blue',
  },
  submitBox: {
    //backgroundColor:'black',
    width:'100%',
    alignItems:'center',
    height:120
  },
  submit: {
    backgroundColor:'#007979',
    width:'90%',
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
  },
  inputBox: {
    width:'95%',
    //backgroundColor:'red',
    justifyContent:'center',
    height:200
  },
  inputContainer: {
    borderWidth: 1,  
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
    borderColor:'#BEBEBE',
    height:40,
    padding:10
  },
  inputText: {
  },
  signUpBox: {
    //backgroundColor:'green',
    width:'100%',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'
  },
  signUp:{
    //backgroundColor:'green',
  }

});