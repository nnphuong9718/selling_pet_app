import React, { Component, Fragment } from 'react'
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import { PaddingView, Swipe, } from '../../components'
import Swiper from 'react-native-swiper'
import { dims, responsiveFont } from '../../constants'
import { images } from '../../assets'

class SwipeItems extends Component {

    renderItem = (data) => {
        return (
            // <View key={`${data.id}`}>
            <TouchableWithoutFeedback
                onPress={data.onPress}>
                <View style={{ flex: 1, borderRadius: 8, overflow: 'hidden', }}>
                    <Image source={data.image} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
                </View>
            </TouchableWithoutFeedback >
            // </View >
        )
    }

    dotStyle = () => {
        return (
            <View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 2, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: -5 }} />
        )
    }

    activeDotStyle = () => {
        return (
            <View style={{ backgroundColor: '#007aff', width: 8, height: 2, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: -5 }} />
        )
    }

    render() {
        const dataItems = [
            {
                id: 1,
                onPress: () => { console.log('hehehe') },
                image: images.pet_1

            },
            {
                id: 2,
                onPress: () => { },
                image: images.pet_2
            },
            {
                id: 3,
                onPress: () => { },
                image: images.pet_3
            },
            {
                id: 4,
                onPress: () => { },
                image: images.pet_4
            },
            {
                id: 5,
                onPress: () => { },
                image: images.pet_5
            }
        ]
        return (

            <Swiper
                style={{}}
                dot={this.dotStyle()}
                activeDot={this.activeDotStyle()}
                autoplay={true}

            >
                {dataItems.map(
                    // <View
                    //     key={`${data.id}`}
                    // >
                    this.renderItem
                    // </View>
                )}
            </Swiper>



        )
    }
}

export default SwipeItems;
