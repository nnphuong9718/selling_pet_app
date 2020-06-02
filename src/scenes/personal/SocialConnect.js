import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux';
// import { images, icons } from '../../assets'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { dims, responsiveFont } from '../../constants'

export default class SocialConnect extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Ionicons name='ios-share-alt' size={24} color='#58ACFA' />
                <Text style={styles.titleStyle}>
                    Kết nối mạng xã hội
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 10,
        marginVertical: 10,
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: responsiveFont(dims.Fonts.size.medium - 2),
        color: '#000',
        paddingLeft: 10,
    },
})
