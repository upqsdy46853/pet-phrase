import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './HomeScreen.js'
import ListScreen from './ListScreen.js'
import VoiceTest from './VoiceTest.js'
import {list, revise, remove} from './api/record'
import {PERMISSIONS} from 'react-native-permissions';
PERMISSIONS.IOS.SPEECH_RECOGNITION;
PERMISSIONS.IOS.MICROPHONE;
import {TouchableOpacity} from 'react-native'
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer as drawer, TouchableRipple, Switch, Title} from 'react-native-paper'
import SignInScreen from './SignIn.js';
import { login } from './api/login.js';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

//function DetailsScreen() {
//  return (
//    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//      <Text>Details!</Text>
//    </View>
//  );
//}

function HomeStackScreen(props) {
  return (
    <HomeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#FFF', },
      headerTitleStyle:{fontFamily:'SignPainter',fontWeight:'900',fontSize: 35},
      //headerRight:()=>(
      //  <TouchableOpacity>
      //    <Icon name="ellipsis-v" size={30} style={{width:15}}/>
      //  </TouchableOpacity>
      //)
    }}>
      <HomeStack.Screen name="Pet Phrase" children={()=><HomeScreen username={props.username} getWordList={props.getWordList}/>} />
      {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
    </HomeStack.Navigator>
  );
}

const ListStack = createStackNavigator();

function ListStackScreen(props) {
  return (
    <ListStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#FFF' },headerTitleStyle:{fontFamily:'SignPainter',fontWeight:'900',fontSize: 35}} }>
      <ListStack.Screen name="Pet Phrase" children={()=><ListScreen word={props.word} getWordList={props.getWordList}/>} />
      {/* <ListStack.Screen name="Details" component={DetailsScreen} /> */}
    </ListStack.Navigator>
  );
}
export default class App extends React.Component {
  state = {
    word: [],
    isSignIn: false,
    username:"",
    password:""
  }

  render(){
    if(!this.state.isSignIn)
      return <SignInScreen signIn={this.signIn.bind(this)} onUsernameChange={this.onUsernameChange.bind(this)} onPasswordChange={this.onPasswordChange.bind(this)}/>
    else
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props=><DrawerContent {...props} signOut={this.signOut.bind(this)} username={this.state.username}/>}>
          <Drawer.Screen name="Drawer" children={()=><DrawerScreen getWordList={this.getWordList.bind(this)} word={this.state.word} username={this.state.username}/>} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  getWordList(){
    list(this.state.username).then(word=>{
      this.setState({
        word,
      })
     })
  }

  signIn(){
    login(this.state.username,this.state.password).then(res=>{
      if(res.exists){
        this.setState({isSignIn:true})
        console.log(this.state.username)
      }
    })
  }

  signOut(){
    console.log(this.state.username)
    this.setState({
      isSignIn:false,
      password:""
    })
  }

  onUsernameChange(value){
    this.setState({username:value})
  }

  onPasswordChange(value){
    this.setState({password:value})
  }
  
}



const Drawer = createDrawerNavigator();

function DrawerContent(props){


  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props}>
      <View style={{flexDirection:'row', height:90}}>
        <Avatar
          rounded
          size={'large'}
          icon={{name: 'user',color:'white', type: 'font-awesome', size:60}}
          onPress={() => console.log("Works!")}
          containerStyle={{marginLeft: 20, backgroundColor:'gray'}}
        />
        <View style={{justifyContent:'center', padding:20}}>
        <Title style={{fontSize:30}}>{props.username}</Title>
        </View>
      </View>
          <drawer.Section style={{justifyContent:'center',justifyContent:''}}>
            <DrawerItem
              icon={({color,size})=>(
                <Icon name="exit-to-app" size={30} color={"#444444"}/>
              )}
              label="登出"
              onPress={props.signOut}
            />
          </drawer.Section>
        </DrawerContentScrollView>

    </View>

  )
}

function DrawerScreen(props) {
  return (
      <Tab.Navigator tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: '#BEBEBE',
        style: {
          backgroundColor: '#F5F5F5'
        },
      }}>
        <Tab.Screen name="Home" children={()=><HomeStackScreen username={props.username} getWordList={props.getWordList.bind(this)}/>} options={{
        tabBarLabel: '首頁',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={size+8} color={color} />
        ),
      }}/>
        <Tab.Screen name="List" children={()=><ListStackScreen word={props.word} getWordList={props.getWordList.bind(this)}/>}  options={{
        tabBarLabel: '你常說',
        tabBarIcon: ({ color, size }) => (
          <Icon name="heart" size={size+3} color={color} />
        ),
      }}/>
      </Tab.Navigator>
  );
}