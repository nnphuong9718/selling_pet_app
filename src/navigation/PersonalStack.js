import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PersonalScreen from '../scenes/personal';
import UserScreen from '../scenes/personal/UserScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PersonalStack = createStackNavigator();

function PersonalStackScreen() {
    return (
        <PersonalStack.Navigator>
            <PersonalStack.Screen name="Cá nhân" component={PersonalScreen} options={{ headerShown: false }} />
            <PersonalStack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{
                    title: 'Đăng nhập / Đăng ký',
                    headerTintColor: '#FFF',
                    headerStyle: { backgroundColor: '#1A9EFF' },
                    headerTitleStyle: { fontWeight: 'bold', color: '#FFF' },
                    headerBackImage: null
                }}
            />
        </PersonalStack.Navigator>
    )
}

export default PersonalStackScreen;