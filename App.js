import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Personal, Home, Category, Search } from './src/scenes'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux'
import store from './src/store'
import { PersonalStack } from './src/navigation'

const Tab = createBottomTabNavigator();

export default class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let colorIcon;

                if (route.name === 'Trang chủ') {
                  iconName = 'md-home';
                  colorIcon = focused ? '#1A9EFF' : '#515558'
                } else if (route.name === 'Danh mục') {
                  iconName = 'ios-list-box';
                  colorIcon = focused ? '#1A9EFF' : '#515558';
                } else if (route.name === 'Tìm kiếm') {
                  iconName = 'ios-search';
                  colorIcon = focused ? '#1A9EFF' : '#515558';
                } else {
                  iconName = 'ios-person';
                  colorIcon = focused ? '#1A9EFF' : '#515558'
                }
                return <Ionicons name={iconName} size={23} color={colorIcon} />
              },
            })}
          >
            <Tab.Screen name="Trang chủ" component={Home} />
            <Tab.Screen name="Danh mục" component={Category} />
            <Tab.Screen name="Tìm kiếm" component={Search} />
            <Tab.Screen name="Cá nhân" component={PersonalStack} />
          </Tab.Navigator>
        </NavigationContainer >
      </Provider >
    )
  }
}

console.disableYellowBox = true
