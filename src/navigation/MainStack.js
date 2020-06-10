import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from '../scenes/details';
import HomeScreen from '../scenes/home'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CartScreen from '../scenes/cart'
import Payment1 from '../scenes/payments/Step1';

const MainStack = createStackNavigator();

function MainStackScreen() {
    return (
        <MainStack.Navigator>

            <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            // options={{
            //     title: 'Đăng nhập / Đăng ký',
            // headerTintColor: '#FFF',
            // headerStyle: { backgroundColor: '#1A9EFF' },
            // headerTitleStyle: { fontWeight: 'bold', color: '#FFF' },
            //     headerBackImage: null
            // }}
            />
            <MainStack.Screen name="Details" component={DetailScreen} options={{ headerShown: false }} />
            <MainStack.Screen name="Cart" component={CartScreen} options={{
                title: 'Giỏ hàng',
                headerTintColor: '#FFF',
                headerStyle: { backgroundColor: '#1A9EFF' },
                headerTitleStyle: { color: '#FFF' },

            }} />
            <MainStack.Screen name="Payment1" component={Payment1}
                options={{
                    title: 'Địa chỉ nhận hàng',
                    headerTintColor: '#FFF',
                    headerStyle: { backgroundColor: '#1A9EFF' },
                    headerTitleStyle: { color: '#FFF' },
                }}

            />
        </MainStack.Navigator>
    )
}

export default MainStackScreen;