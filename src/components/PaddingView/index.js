import React, { Component } from 'react'
import { View } from 'react-native'

export default class PaddingView extends Component {
    render() {
        const { children, style } = this.props;
        return (
            <View style={[style, { paddingHorizontal: 20 }]}>
                {children}
            </View>
        )
    }
}
