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
    <HomeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#FFF', }, headerTitleStyle:{fontFamily:'SignPainter',fontWeight:'900',fontSize: 35} }}>
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
    word: []
  }

  componentDidMount() {
    this.getWordList()
  }

  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: '#BEBEBE',
          style: {
            backgroundColor: '#F5F5F5'
          },
          
        }}>
          <Tab.Screen name="Home" children={()=><HomeStackScreen getWordList={this.getWordList.bind(this)}/>} options={{
          tabBarLabel: '首頁',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size+8} color={color} />
          ),
        }}/>
          <Tab.Screen name="List" children={()=><ListStackScreen word={this.state.word} getWordList={this.getWordList.bind(this)}/>}  options={{
          tabBarLabel: '你常說',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size+3} color={color} />
          ),
        }}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  getWordList(){
    list('pochih').then(word=>{
      this.setState({word})
     })
  }
  
}