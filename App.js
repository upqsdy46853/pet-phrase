import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import {Drawer as drawer, TouchableRipple, Switch} from 'react-native-paper'
import SignInScreen from './SignIn.js';


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
      headerRight:()=>(
        <TouchableOpacity>
          <Icon name="ellipsis-v" size={30} style={{width:15}}/>
        </TouchableOpacity>
      )
    }}>
      <HomeStack.Screen name="Pet Phrase" children={()=><HomeScreen getWordList={props.getWordList}/>} />
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

  componentDidMount() {
    this.getWordList()
  }

  render(){
    if(!this.state.isSignIn)
      return <SignInScreen signIn={this.signIn.bind(this)} onUsernameChange={this.onUsernameChange.bind(this)} onPasswordChange={this.onPasswordChange.bind(this)}/>
    else
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props=><DrawerContent {...props} signOut={this.signOut.bind(this)}/>}>
          <Drawer.Screen name="Drawer" children={()=><DrawerScreen getWordList={this.getWordList.bind(this)} word={this.state.word} />} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  getWordList(){
    list('pochih').then(word=>{
      this.setState({word})
     })
  }

  signIn(){
    //this.setState({isSignIn:true})
    console.log(this.state.username,this.state.password)
  }

  signOut(){
    this.setState({isSignIn:false})
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

  const [isEngineer, becomeEnginner] = React.useState(false);

  const toggleTheme = ()=>{
    becomeEnginner(!isEngineer);
  };
  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props}>
        <Text>pochih</Text>

        {/*<drawer.Section title="preference">
          <TouchableRipple onPress={()=>{toggleTheme()}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{flex:1}}>你是工程師?</Text>
              <View pointerEvents="none">
                <Switch value={isEngineer}/>
              </View>
            </View>
          </TouchableRipple>
        </drawer.Section>*/}

        <drawer.Section>
          <DrawerItem
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
        <Tab.Screen name="Home" children={()=><HomeStackScreen getWordList={props.getWordList.bind(this)}/>} options={{
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