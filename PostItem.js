import React from 'react';
import {View, StyleSheet,Text, Button, TextInput} from 'react-native';
import  PropTypes from 'prop-types'
import {revise} from './api/record'

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
                <Text style = {styles.input}>{c_text}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>{this.setState({text: text})}}
                    onSubmitEditing= {this.handleSubmit.bind(this)}
                    value= {this.state.text}
                /> 
            </View>
        </View>
        )
    }

    handleSubmit(){
        revise(this.props.id, this.state.text)
    }
    
}


const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        borderWidth: 4,
        borderColor: '#FFFFFF',
    },
    c_text: {
        textAlign: 'center',
        fontSize: 30,
        padding:5
    },
    post: {
        backgroundColor: 'powderblue',
        borderRadius:10,
        opacity:0.7
    },
    edit:{

    },
    input:{
        textAlign: 'center',
        fontSize: 25,
        padding: 5,
    }
});