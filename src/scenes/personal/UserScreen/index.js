import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux';
// import { images, icons } from '../../assets'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { dims, responsiveFont } from '../../../constants'
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default class UserScreen extends Component {
    render() {
        return (
            <Tab.Navigator tabBarOptions={{ activeTintColor: "#1A9EFF", indicatorStyle: { backgroundColor: '#1A9EFF' } }}>
                <Tab.Screen name='Đăng nhập' component={LoginScreen} />
                <Tab.Screen name='Đăng ký' component={SignUpScreen} />
            </Tab.Navigator>
        )
    }
}
