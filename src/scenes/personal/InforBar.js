import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux';
// import { images, icons } from '../../assets'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { dims, responsiveFont } from '../../constants'

class InforBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View style={styles.wrapIcon}>
                        <Ionicons name='ios-person' size={30} color={'#FFF'} />
                    </View>
                    <View style={styles.inforStyle}>
                        <Text style={styles.titleStyle}>TEST</Text>
                        <Text style={styles.textStyle}>style 1</Text>
                        <Text style={styles.textStyle}>style 1</Text>
                    </View>
                </View>

                <View style={styles.rightContainer}>
                    <Ionicons name='ios-arrow-dropright' size={24} color={'#58ACFA'} />
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        alignItems: 'center'
    },
    leftContainer: {
        flex: 0.9,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    rightContainer: {
        flex: 0.1,

    },
    titleStyle: {
        fontSize: responsiveFont(dims.Fonts.size.medium - 2),
        color: '#000'
    },
    textStyle: {
        fontSize: responsiveFont(dims.Fonts.size.small - 2),
        color: '#6E6E6E'
    },
    wrapIcon: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#58ACFA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inforStyle: {
        paddingLeft: 10,
    }
})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(InforBar)
