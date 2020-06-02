import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'

type Props = {
    title: String,
    onPress: Function,
    style: Object,
    titleStyle: Object,
    disabled?: Boolean,
    isLoading?: Boolean,
}

class ButtonCus extends Component<Props> {
    static defaultProps = {
        title: 'Tiếp theo',
        onPress: () => { },
        titleStyle: {},

        disabled: false,
        isLoading: false,
        style: {}
    }
    render() {
        const { title, onPress, titleStyle, disabled, isLoading, style, } = this.props;
        return (
            <View style={style}>

                <TouchableOpacity onPress={onPress} disabled={disabled}>
                    <View style={styles.itemStyle}>
                        <Text style={[styles.textStyle, titleStyle]}>{title}</Text>
                        {isLoading ?
                            <ActivityIndicator color='white' style={{ marginLeft: 5 }} />
                            : null
                        }
                    </View>
                </TouchableOpacity>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    btnStyle: {
        marginTop: 16,
        backgroundColor: 'transparent',
    },
    textStyle: {
        // paddingVertical: 10,
        textAlign: 'center',
    },
    itemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ButtonCus;
