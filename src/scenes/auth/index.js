import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { ButtonCus, Container, PaddingView } from '../../components'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }
    loginPress = () => {
        this.setState({
            isLoading: !this.state.isLoading
        })
    }
    render() {
        const { isLoading } = this.state;
        return (
            <View>
                <Text>
                    OKKK
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        backgroundColor: 'red'
        // width: Dimensions.get('window').width * 0.9
    }
})
