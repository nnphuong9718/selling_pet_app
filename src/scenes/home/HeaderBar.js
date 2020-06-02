import React, { Component, Fragment } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { Container, PaddingView, SearchBar } from '../../components'
import { images, icons } from '../../assets'
import { screenWidth, screenHeight, dims, isIPhoneX } from '../../constants/dims'

class HeaderBar extends Component {

    handleSearch = (text) => {
        console.log(text)
    }
    render() {
        return (

            <PaddingView style={styles.container}>

                <View style={styles.containerLogo}>
                    <View style={{ flex: 0.9, }}>
                        <SearchBar
                            containerStyle={{ width: '100%', borderRadius: 5, paddingHorizontal: 15, backgroundColor: '#FFF' }}
                            style={{ paddingVertical: 10, }}
                            placeholder='Bạn tìm gì hôm nay...'
                            onChangeText={(text) => this.handleSearch(text)}
                            placeholderTextColor='#000'
                        />
                    </View>
                    <View style={{ flex: 0.1, alignItems: 'center', marginLeft: 8 }}>
                        <Image
                            source={icons.iconCart}
                            style={styles.iconStyle}
                        />
                    </View>
                </View>

            </PaddingView>


        )
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#1A9EFF',
        paddingTop: isIPhoneX ? 44 : 0,

    },
    containerLogo: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    iconStyle: {
        width: 23,
        height: 23
    }
})
export default HeaderBar
