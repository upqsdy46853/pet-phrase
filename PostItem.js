import React from 'react';
import {View, StyleSheet,Text, TouchableOpacity, TextInput} from 'react-native';
import  PropTypes from 'prop-types'
import {revise, remove} from './api/record'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PostItem extends React.Component{
    static propTypes ={
        id: PropTypes.string.isRequired,
        c_text: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        // editOpen: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            text: props.e_text
        };

        
    }
  
    render(){
        const {id, c_text, e_text} = this.props;
        return(
        <View style={styles.listItem}>
            <View style = {styles.post}>
                <Text style = {styles.c_text}>{c_text}</Text>
                <TouchableOpacity style = {styles.cross} onPress = {this.handleDelete.bind(this)}>
                    <Icon name="times" size={25} color="black"/>
                </TouchableOpacity>
                <TextInput
                    style={styles.e_text}
                    onChangeText={(text)=>{this.setState({text: text})}}
                    onSubmitEditing= {this.handleSubmit.bind(this)}
                    value= {this.state.text}
                /> 
            </View>
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
        borderWidth: 4,
        borderColor: '#FFFFFF',
    },
    post: {
        backgroundColor: 'powderblue',
        borderRadius:10,
        opacity:0.7
    },
    edit:{

    },
    c_text:{
        textAlign: 'center',
        fontSize: 23,
        padding: 4,
        fontWeight: 'bold'
    },
    e_text:{
        textAlign: 'center',
        fontSize: 22,
        padding: 4,
        color: '#222222'
    }
    ,
    cross:{
        position:'absolute',left:360
    }
});