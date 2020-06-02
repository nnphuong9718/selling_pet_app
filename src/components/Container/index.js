import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { dims } from '../../constants/'

class Container extends Component {
    render() {
        console.log(screenWidth)
        const { children } = this.props;
        return (
            <View style={{ flex: 1, paddingTop: dims.screenWidth > 413 ? 50 : 25 }}>
                {children}
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
export default Container
