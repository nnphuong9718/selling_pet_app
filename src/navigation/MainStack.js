import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from '../scenes/details';
import HomeScreen from '../scenes/home'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CartScreen from '../scenes/cart'
import Payment1 from '../scenes/payments/Step1';
import Payment2 from '../scenes/payments/Step2';
import Payment3 from '../scenes/payments/Step3';
import Payment4 from '../scenes/payments/Step4';
import SearchResult from '../scenes/searchResult'
import { Colors } from '../constants';
import { StatusBar } from 'react-native';

const MainStack = createStackNavigator();

function MainStackScreen() {
    return (
        // <StatusBar backgroundColor={Colors.blue}>
        <MainStack.Navigator

        >

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
            <MainStack.Screen name="Details"
                component={DetailScreen}
                options={{ headerShown: false }} />
            <MainStack.Screen name="Cart" component={CartScreen} options={{
                title: 'Giỏ hàng',
                headerTintColor: '#FFF',
                headerStyle: { backgroundColor: Colors.blue },
                headerTitleStyle: { color: '#FFF' },

            }} />
            <MainStack.Screen name="Payment1" component={Payment1}
                options={{
                    title: 'Địa chỉ nhận hàng',
                    headerTintColor: '#FFF',
                    headerStyle: { backgroundColor: Colors.blue },
                    headerTitleStyle: { color: '#FFF' },
                }}

            />
            <MainStack.Screen name="Payment2" component={Payment2}
                options={{
                    title: 'Thanh toán',
                    headerTintColor: '#FFF',
                    headerStyle: { backgroundColor: Colors.blue },
                    headerTitleStyle: { color: '#FFF' },
                }}

            />
            <MainStack.Screen name="Payment3" component={Payment3}
                options={{
                    title: 'Xác nhận',
                    headerTintColor: '#FFF',
                    headerStyle: { backgroundColor: Colors.blue },
                    headerTitleStyle: { color: '#FFF' },
                }}
            />
            <MainStack.Screen name="Payment4" component={Payment4}
                options={{
                    title: 'Thông tin đơn hàng',
                    headerTintColor: '#FFF',
                    headerStyle: { backgroundColor: Colors.blue },
                    headerTitleStyle: { color: '#FFF' },
                }}
            />
            <MainStack.Screen name="SearchResult" component={SearchResult}
                options={{
                    headerShown: false
                }}

            />
        </MainStack.Navigator>
        // </StatusBar >
    )
}

export default MainStackScreen;