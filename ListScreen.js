import React from 'react';
import {Button, StyleSheet, Text, View, Image, FlatList} from 'react-native';
//import { ListItem, Avatar } from 'react-native-elements';
//import { ScrollView } from 'react-native-gesture-handler';
import PostItem from './PostItem'
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

const DATA =[
  {id: 'data1', title:'我很好', content:'I am good.'},
  {id: 'data2', title:'我難過', content:'I am sad.'},
  {id: 'data3', title:'我愛你', content:'I love you.'},
  {id: 'data4', title:'我討厭你', content:'I hate you.'},
  {id: 'data5', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data6', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data7', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data8', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data9', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data10', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data11', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data12', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data13', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data14', title:'我肚子', content:'I am hungry.'},
  {id: 'data15', title:'我很好', content:'I am good.'},
  {id: 'data16', title:'我難過', content:'I am sad.'},
  {id: 'data17', title:'我愛你', content:'I love you.'},
  {id: 'data18', title:'我討厭你', content:'I hate you.'},
  {id: 'data19', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data20', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data21', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data22', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data23', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data24', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data25', title:'我肚子餓18', content:'I am hungry.'},
  {id: 'data26', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data27', title:'我肚子餓', content:'I am hungry.'},
  {id: 'data28', title:'我肚子20', content:'I am hungry.'}
]


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
          keyExtractor={item => item.c_text}
        />
        <Button onPress={()=>{console.log(this.props.word)}} title="click"/>
        </View>
    );
  }
}

