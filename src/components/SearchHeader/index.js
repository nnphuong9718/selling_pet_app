import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../assets'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../constants';

type Props = {
    placeholder: String,
    style: Object,
    onChangeText: Function,
    maxLength: Number,
    containerStyle: Object,
    placeholderTextColor: String,
    onPress: Function,
    onSubmit: Function,
}

class SearchBar extends Component<Props> {
    static defaultProps = {
        placeholder: '',
        style: {},
        onChangeText: () => { },
        maxLength: 99,
        containerStyle: {},
        placeholderTextColor: '#FFF',
        onPress: () => { },
        onSubmit: () => { },
    }

    render() {
        const { placeholder, style, onChangeText, maxLength, containerStyle, placeholderTextColor, onPress, onSubmit } = this.props;
        return (
            <View style={[styles.container, containerStyle]}>
                <TouchableOpacity
                    onPress={onPress}
                >
                    {/* <Image source={icons.search} style={{ width: 23, height: 23, marginRight: 10 }} /> */}
                    <Ionicons name="ios-arrow-back" size={24} color={Colors.grayText2} />
                </TouchableOpacity>
                <TextInput
                    style={style}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                    placeholderTextColor={placeholderTextColor}
                    onSubmitEditing={onSubmit}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default SearchBar;
