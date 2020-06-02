import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { responsiveFont, dims } from '../../constants'
import { PaddingView } from '../index'
import { isIPhoneX } from '../../constants/dims'
import { images, icons } from '../../assets'


type Props = {
    title: String,
    onPress: Function,
}

class HeaderBar extends Component<Props> {

    render() {
        const { title, onPress } = this.props;
        return (
            <PaddingView style={styles.container}>
                <View style={styles.containerStyle}>
                    <Text style={styles.titleStyle}>{title}</Text>
                    <TouchableOpacity onPress={onPress}>
                        <Image source={icons.iconCart} style={styles.iconStyle} />
                    </TouchableOpacity>
                </View>
            </PaddingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#1A9EFF',
        paddingTop: isIPhoneX ? 44 : 0,

    },
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleStyle: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: responsiveFont(dims.Fonts.size.large),
        paddingVertical: 10,
    },
    iconStyle: {
        width: 24,
        height: 24,
    }
})

export default HeaderBar;
