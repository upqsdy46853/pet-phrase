import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Microphone from './Microphone.js'

export default class HomeScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.contents}>
          <Microphone/>
        </View>
      </View>
    );
  }

  startRecording(){
    console.log("startRecording");
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  contents: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});