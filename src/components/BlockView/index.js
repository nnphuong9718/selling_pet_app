import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Colors, dims, responsiveFont } from '../../constants'

type Props = {
    title: String,
    leftComponent?: Component,
    rightComponent?: Component,
}

class BlockView extends Component {
    static defaultProps = {
        title: '',
        leftComponent: <></>,
        rightComponent: <></>
    }
    render() {
        const { title, leftComponent, rightComponent } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.titleStyle}>
                    <Text style={styles.titleTextStyle}>
                        {title}
                    </Text>
                </View>
                <View style={styles.containerStyle}>
                    {leftComponent}
                    {rightComponent}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
    },
    titleTextStyle: {
        fontSize: responsiveFont(dims.Fonts.size.small),
        padding: 10,
    },
    titleStyle: {
        backgroundColor: '#E6E6E6',
        flex: 1,
        paddingHorizontal: 20,
    },
    containerStyle: {
        flexDirection: 'row',

    }
})

export default BlockView;
