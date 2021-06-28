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
	<Text style={styles.logo}>Pet Phrase</Text>
	<View style={{width:'95%'}}>
	  <Input
	  placeholder="帳號"
	  inputContainerStyle={styles.inputContainer}
	  inputStyle={styles.inputText}
	  leftIcon={
		<Icon name="user" size={20} color={'#4F4F4F'}/>
	  }
	  onChangeText={value => this.props.onUsernameChange(value)}
	/>
	</View>
	<View style={{width:'95%'}}>
	  <Input
	  placeholder="密碼"
	  inputContainerStyle={styles.inputContainer}
	  inputStyle={styles.inputText}
	  secureTextEntry={true}
	  leftIcon={
		<Icon name="lock" size={20} color={'#4F4F4F'}/>
	  }
	  onChangeText={value => this.props.onPasswordChange(value)}
	/>
	</View>
	<TouchableOpacity style={styles.submit} onPress={this.props.signIn}>
	  <Text style={{color:'white'}}>登入</Text>	
	</TouchableOpacity>
	{/*<TouchableOpacity>
		<Text style={{marginHorizontal: 5, fontWeight: 'bold', color:'#0066CC'}}>註冊</Text>
	</TouchableOpacity>*/}
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1 , 
    alignItems:'center',
    //justifyContent:'center'
    
  },
  logo: {
    textAlign:'center',
    fontFamily:'SignPainter',
    fontWeight:'900',fontSize: 50,
  },
  submit: {
    backgroundColor:'#007979',
    width:'90%',
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10
  },
  inputContainer: {
    borderWidth: 1,  
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
    borderColor:'#BEBEBE',
    height:40,
    padding:5 
  },
  inputText: {

  },

});