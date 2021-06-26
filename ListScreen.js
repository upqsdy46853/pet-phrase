import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const list = [
  {
    name: '哈囉',
    avatar_url: 'https://cdn.britannica.com/22/206222-131-E921E1FB/Domestic-feline-tabby-cat.jpg',
    subtitle: 'Hello'
  },
  {
    name: '中餐吃什麼',
    avatar_url: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/is_my_cat_normal_slideshow/1800x1200_is_my_cat_normal_slideshow.jpg',
    subtitle: "What's for lunch?"
  },
]

export default class ListScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.contents}>
          <ScrollView>
            {
              list.map((l, i) => (
                <ListItem key={i} bottomDivider>
                  <Avatar source={{uri: l.avatar_url}} />
                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
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

