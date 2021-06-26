import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
//import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Microphone extends React.Component {
    state = {
        isPressed: false,
        animated: new Animated.Value(0),
        opacityA: new Animated.Value(1),
    }
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
    }
    _runAnimation() {
        const { animated, opacityA } = this.state;

        Animated.loop(
            Animated.parallel([
                Animated.timing(animated, {
                    toValue: 1,
                    duration: 1000,
		    useNativeDriver: false
                }),
                Animated.timing(opacityA, {
                    toValue: 0.2,
                    duration: 1000,
		    useNativeDriver: false
                })
            ]),
        ).start();
    }
    _stopAnimation() {
        Animated.loop(
            Animated.parallel([
                Animated.timing(animated),
                Animated.timing(opacityA)
            ])
        ).stop();
    }
    _onPress() {
        this.setState(
            state => ({ isPressed: !state.isPressed }),
        )
        //bug here
        if(!this.state.isPressed)
            this.props.record()
        else    
            this.props.stop()
    }
    _micButton() {
        const { isPressed, animated, opacityA, } = this.state;
        if (isPressed) {
            //some function
            //record()
            this._runAnimation();
            return (
                <Animated.View style={{
                    width: 90,
                    height: 90,
                    borderRadius: 50,
                    backgroundColor: '#BEDCA3',
                    opacity: opacityA,
                    transform: [
                        {
                            scale: animated
                        }
                    ]

                }}>
                    {/* icon or image */}
                </Animated.View>
            );
        } else {
            //some function
            //stopRecord()
            return (
                <View style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    backgroundColor: '#BEDCA3',
                }}>
                    {/* icon or image */}
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPress} style={styles.container}>
                    {this._micButton()}
                    <Icon name="microphone" size={40} color="black" style={styles.microphone}/>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    microphone: {
      position: 'absolute',
    }

});
