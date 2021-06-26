import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './HomeScreen.js'
import ListScreen from './ListScreen.js'
import VoiceTest from './VoiceTest.js'
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

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="錄音" component={HomeScreen} />
      {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
    </HomeStack.Navigator>
  );
}

const ListStack = createStackNavigator();

function ListStackScreen() {
  return (
    <ListStack.Navigator>
      <ListStack.Screen name="你常說..." component={ListScreen} />
      {/* <ListStack.Screen name="Details" component={DetailsScreen} /> */}
    </ListStack.Navigator>
  );
}
export default class App extends React.Component {
  render(){
    return (
	//<VoiceTest/>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
        }}>
          <Tab.Screen name="Home" component={HomeStackScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            //<MaterialCommunityIcons name="home" color={color} size={size} />
            <Icon name="home" size={size+5} color={color} />
          ),
        }}/>
          <Tab.Screen name="List" component={ListStackScreen}  options={{
          tabBarLabel: 'word',
          tabBarIcon: ({ color, size }) => (
            //<MaterialCommunityIcons name="heart" color={color} size={size} />
            <Icon name="heart" size={size} color={color} />
          ),
        }}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
