import React from 'react';
import {View, StyleSheet,Text, TouchableOpacity, TextInput, Animated} from 'react-native';
import  PropTypes from 'prop-types'
import {revise, remove} from './api/record'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable } from 'react-native-gesture-handler';
import { Extrapolate } from 'react-native-reanimated';

export default class PostItem extends React.Component{
    static propTypes ={
        id: PropTypes.number.isRequired,
        c_text: PropTypes.string.isRequired,
        e_text: PropTypes.string.isRequired,
        // editOpen: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            text: props.e_text
        };

        
    }
    leftSwipe (progress, dragX){
        return(
            <TouchableOpacity style={styles.deleteBox} activeOpacity={0.6} onPress={this.handleDelete.bind(this)}>
                <Icon name="trash" size={35} color="white" style={styles.microphone}/>
            </TouchableOpacity>
        )
    }
    render(){
        const {id, c_text, e_text} = this.props;
        return(
            <View style={styles.listItem}>
            <Swipeable
                renderRightActions={this.leftSwipe.bind(this)}
            >
                <View style = {styles.post}>
                    <Text style = {styles.c_text}>{c_text}</Text>
                    <TextInput
                        style={styles.e_text}
                        onChangeText={(text)=>{this.setState({text: text})}}
                        onSubmitEditing= {this.handleSubmit.bind(this)}
                        value= {this.state.text}
                    /> 
                </View>
            </Swipeable>
            </View>
        )
    }

    handleSubmit(){
        revise(this.props.id, this.state.text).then(()=>{
            this.props.getWordList()
        })
    }

    handleDelete(){
        remove(this.props.id).then(()=>{
            this.props.getWordList()
        })
    }
    
}


const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        borderWidth: 10,
        borderRadius: 10,
        borderColor: 'rgba(0,0,0,0)',
    },
    post: {
        backgroundColor: '#C4E1E1',
        borderColor: 'rgba(0,0,0,0)',
        borderRadius: 10
    },
    c_text:{
        textAlign: 'center',
        fontSize: 23,
        padding: 4,
        fontWeight: 'bold',
        color: '#283B42'
    },
    e_text:{
        textAlign: 'center',
        fontSize: 22,
        padding: 4,
        color: '#283B42'
    } ,
    deleteBox: {
        backgroundColor: '#FF5151',
        justifyContent: 'center',
        alignItems: 'center',
        width:60,
        borderRadius: 10,
    }

});