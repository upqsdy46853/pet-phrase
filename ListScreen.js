import React from 'react';
import {Button, StyleSheet, Text, View, Image, FlatList} from 'react-native';
//import { ListItem, Avatar } from 'react-native-elements';
//import { ScrollView } from 'react-native-gesture-handler';
import PostItem from './PostItem'

export default class ListScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  renderItem(p) {
    return <PostItem {...p} />;
  }

  render(){
    return (
        <View>
        <FlatList
          data = {this.props.word}
          renderItem = {(p) => { return <PostItem {...p.item}/>;}}
          keyExtractor={item => item.id}
        />
        </View>
    );
  }
}

