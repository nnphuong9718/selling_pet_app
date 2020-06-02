import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { icons } from '../../assets'

type Props = {
    placeholder: String,
    style: Object,
    onChangeText: Function,
    maxLength: Number,
    containerStyle: Object,
    placeholderTextColor: String,
}

class SearchBar extends Component<Props> {
    static defaultProps = {
        placeholder: '',
        style: {},
        onChangeText: () => { },
        maxLength: 99,
        containerStyle: {},
        placeholderTextColor: '#FFF'
    }

    render() {
        const { placeholder, style, onChangeText, maxLength, containerStyle, placeholderTextColor } = this.props;
        return (
            <View style={[styles.container, containerStyle]}>
                <Image source={icons.search} style={{ width: 23, height: 23, marginRight: 10 }} />
                <TextInput
                    style={style}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                    placeholderTextColor={placeholderTextColor}
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
