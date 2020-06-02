import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { responsiveFont, dims } from '../../constants'
import { PaddingView } from '../index'
import { isIPhoneX } from '../../constants/dims'
import { images, icons } from '../../assets'
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
    iconName: String,
    iconSize: Number,
    iconColor: String,
    title: String,
    onPress: Function,
    onList: Boolean,
    imageName: String,
    imageStyle: Object,
}

export default class ListItem extends Component<Props> {
    static defaultProps = {
        iconName: '',
        iconSize: 24,
        iconColor: '#58ACFA',
        title: '',
        onPress: () => { },
        onList: true,
        imageName: '',
        imageStyle: {}
    }
    render() {
        const { iconName, iconSize, iconColor, title, onPress, onList, imageName, imageStyle } = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.container, { marginVertical: onList ? 0 : 10, }]}>
                {iconName ? <Ionicons name={iconName} size={iconSize} color={iconColor} /> : <Image source={imageName} style={imageStyle} />}

                <Text style={styles.titleStyle}>
                    {title}
                </Text>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 10,
        // marginVertical: 10,
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: responsiveFont(dims.Fonts.size.medium - 2),
        color: '#000',
        paddingLeft: 10,
    },

})
