import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../assets'

type Props = {
    placeholder: String,
    style: Object,
    onChangeText: Function,
    maxLength: Number,
    containerStyle: Object,
    placeholderTextColor: String,
    onPress: Function,
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
    }

    render() {
        const { placeholder, style, onChangeText, maxLength, containerStyle, placeholderTextColor, onPress } = this.props;
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[styles.container, containerStyle]}>
                <Image source={icons.search} style={{ width: 23, height: 23, marginHorizontal: 10 }} />
                <View
                    style={style}
                // placeholder={placeholder}
                // onChangeText={onChangeText}
                // maxLength={maxLength}
                // placeholderTextColor={placeholderTextColor}
                >
                    <Text>{placeholder}</Text>
                </View>
            </TouchableOpacity>
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
