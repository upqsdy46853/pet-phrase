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
    <HomeStack.Navigator>
      <HomeStack.Screen name="錄音" children={()=><HomeScreen getWordList={props.getWordList}/>} />
      {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
    </HomeStack.Navigator>
  );
}

const ListStack = createStackNavigator();

function ListStackScreen(props) {
  return (
    <ListStack.Navigator>
      <ListStack.Screen name="你常說..." children={()=><ListScreen word={props.word} getWordList={props.getWordList}/>} />
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
          activeTintColor: '#272727',
          inactiveTintColor: '#BEBEBE',
        }}>
          <Tab.Screen name="Home" children={()=><HomeStackScreen getWordList={this.getWordList.bind(this)}/>} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size+5} color={color} />
          ),
        }}/>
          <Tab.Screen name="List" children={()=><ListStackScreen word={this.state.word} getWordList={this.getWordList.bind(this)}/>}  options={{
          tabBarLabel: 'word',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
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

//import React from 'react';
//import {Animated, TouchableOpacity, View} from 'react-native';
//export default class App extends React.Component {
//
//  state = {
//      animation: new Animated.Value(0)
//  }
//  
//  onPress = () => {
//      Animated.timing(this.state.animation, {
//          toValue: 100,
//          duration: 1000
//      }).start()
//  }
//  
//    render() {
//      return (
//       <TouchableOpacity style={{flex: 100}} onPress={this.onPress}>
//         <Animated.View style={{ flex: this.state.animation, backgroundColor:'blue'}}>
//         </Animated.View>
//         <View style={{flex:100, backgroundColor:'red'}}>
//        </View>
//      </TouchableOpacity>
//      );
//    }
//  }