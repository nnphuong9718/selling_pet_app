import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { responsiveFont, dims } from '../../constants'
import { PaddingView } from '../index'
import { isIPhoneX } from '../../constants/dims'
import { images, icons } from '../../assets'
import Ionicons from 'react-native-vector-icons/Ionicons';


type Props = {
    // title: String,
    onPress: Function,
    onPressBack: Function,
    onPressSearch: Function,
    onPressHome: Function,
    onPressCart: Function,
    onPressMore: Function,
}

class HeaderBarDetail extends Component<Props> {

    static defaultProps = {

    }

    render() {
        const { onPressBack, onPressSearch, onPressHome, onPressCart, onPressMore } = this.props;
        return (
            <PaddingView style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={onPressBack}>
                            <Ionicons name={'ios-arrow-back'} size={24} color={'#A4A4A4'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.button}
                                onPress={onPressSearch}>
                                <Ionicons name={'ios-search'} size={24} color={'#A4A4A4'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={onPressHome}>
                                <Ionicons name={'md-home'} size={24} color={'#A4A4A4'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={onPressCart}>
                                <Ionicons name={'md-cart'} size={24} color={'#A4A4A4'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 0.1 }}>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={onPressMore}>
                            <Ionicons name={'ios-more'} size={24} color={'#A4A4A4'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </PaddingView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // backgroundColor: '#1A9EFF',
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
    },
    button: {
        paddingRight: 20
    }
})

export default HeaderBarDetail;
