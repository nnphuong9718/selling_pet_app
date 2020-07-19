import React, { Component, Fragment } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PaddingView, SearchBar } from '../../components'
import { icons } from '../../assets'
import { isIPhoneX } from '../../constants/dims'
import * as AsyncStorage from '../../utils/asyncStorage'
import { emitter } from '../../utils/eventEmitter';

class HeaderBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numOfProducts: 0
        }
    }

    async componentDidMount() {
        emitter.addListener('RELOAD_CART',
            // this.fetchData();
            console.log('### hehe')
        );
        this.fetchData()
    }

    fetchData = async () => {
        const { keys, getItem } = AsyncStorage;
        const data = await getItem(keys.cart);

        console.log('@@@', data);
        const _data = data ? JSON.parse(data) : null;
        this.setState({
            numOfProducts: _data ? _data.length : 0
        })
    }

    handleSearch = (text) => {
        console.log(text)
    }
    onPressCart = () => {
        this.props.onPressCart();
    }
    onPressSearchBar = () => {
        this.props.onPressSearchBar();
    }
    render() {
        const { numOfProducts } = this.state;
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
                            onPress={this.onPressSearchBar}
                        />
                    </View>
                    <View style={{ flex: 0.1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{ alignItems: 'center', marginLeft: 8 }}
                                onPress={this.onPressCart}
                            >
                                <Image
                                    source={icons.iconCart}
                                    style={styles.iconStyle}
                                />
                            </TouchableOpacity>
                            {
                                numOfProducts ?

                                    <View style={[styles.badge, {}]}>
                                        <Text style={styles.textBadge}>{numOfProducts}</Text>
                                    </View>
                                    : null
                            }
                        </View>

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
    },
    badge: {
        backgroundColor: '#FF0000',
        borderRadius: 5,
        height: 23,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -4,
        marginTop: -10
    },
    textBadge: {
        color: '#FFF',
        paddingHorizontal: 6
    }
})
export default HeaderBar
