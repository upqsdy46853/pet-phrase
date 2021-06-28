import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import Microphone from './Microphone.js'
import {record} from './api/record'

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import { Button } from 'react-native-elements/dist/buttons/Button';


export default class HomeScreen extends React.Component {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [''],
    partialResults: [],
    outputString: '',
    animation: new Animated.Value(0)
  };
  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    cnt = 0;
    en = true;
    pre = ''
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
    cnt = 0;
    en = true;
  };

  onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    var parseString = e.value[0].substr(pre.length);
    this.setState({
      results: e.value,
      outputString: parseString 
    });
    console.log(parseString)
  };

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e: any) => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
    cnt = cnt + 1
    if(cnt>10 && en){
      //console.log(this.state.results)
      en = false 
      if(this.state.results[0]){
        pre = this.state.results[0]
      }
      if(this.state.outputString)
        record('pochih',this.state.outputString).then(()=>{
          console.log('complete')
          this.props.getWordList()
        })
        this.setState({
          outputString: ''
        })
    }
  };

  _startRecognizing = async () => {
    pre = ''
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [''],
      partialResults: [],
      end: '',
      outputString: ''
    });

    Animated.timing(this.state.animation, {
      toValue: 3,
      duration: 1000,
      useNativeDriver: false
    }).start()

    try {
      await Voice.start('zh_TW');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
      try {
        await Voice.stop();
      } catch (e) {
        console.error(e);
      }
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
      }).start()
  }; 
  _cancelRecognizing = async () => {
     try { await Voice.cancel(); } catch (e) { console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [''],
      partialResults: [],
      end: '',
    });
  };

  render(){
    return (
      <View style={styles.container}>
          <Animated.View style={{flex: this.state.animation, borderWidth: 10, borderColor: '#fff'}}>
            <Text style={styles.outputString}> {this.state.outputString} </Text>
          </Animated.View>
          <Microphone record={this._startRecognizing} stop={this._stopRecognizing}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  outputString:{
    fontSize: 40,
    color: 'gray',
    flex: 5,
  }
});