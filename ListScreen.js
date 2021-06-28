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
        <View style={styles.container}>
          <FlatList
            data = {this.props.word}
            renderItem = {(p) => { return <PostItem {...p.item} getWordList={this.props.getWordList}/>;}}
            keyExtractor={item => item.id}
          />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: '#eee'
  },
});

