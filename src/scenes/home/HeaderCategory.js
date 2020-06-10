import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { ButtonCus, PaddingView } from '../../components'
import { dims, responsiveFont } from '../../constants'
import Iconicons from 'react-native-vector-icons/Ionicons'

export default class CategoryProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedIndex: 0,

        }
    }


    render() {
        const { leftTitle, type, onPress, children, style } = this.props;
        return (
            <View>
                <View style={[styles.containerListProduct, style]}>
                    <Text style={styles.leftText}>
                        {leftTitle}
                    </Text>
                    {!type ?
                        <TouchableOpacity onPress={onPress}>
                            <Text style={styles.buttonText}>
                                Xem thêm
                            </Text>
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={onPress}>
                            <Iconicons name='ios-arrow-dropdown' size={23} color='#1A9EFF' />
                        </TouchableOpacity>
                    }
                </View>
                {children}


            </View >

        )
    }
}

const styles = StyleSheet.create({
    containerListProduct: {
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    leftText: {
        fontWeight: 'bold',
        fontSize: responsiveFont(dims.Fonts.size.small)
    },
    buttonText: {
        color: '#1A9EFF',
    },
    containerProduct: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black', 
        marginRight: 10,
        borderColor: '#515558',
        borderWidth: 0.75,
        borderRadius: 8,
    }
})
