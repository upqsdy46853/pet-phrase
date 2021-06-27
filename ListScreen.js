import React from 'react';
import {Button ,StyleSheet, Text, View, Image} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


export default class ListScreen extends React.Component {

  componentDidMount(){
    console.log(this.props.word)
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.contents}>
          <ScrollView>
            {
              this.props.word.map((l, i) => (
                <ListItem key={i} bottomDivider>
                  {/* <Avatar source={{uri: l.avatar_url}} /> */}
                  <ListItem.Content>
                    <ListItem.Title>{l.c_text}</ListItem.Title>
                    {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
                  </ListItem.Content>
                </ListItem>
              ))
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  contents: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

