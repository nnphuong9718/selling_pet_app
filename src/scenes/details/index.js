import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, ScrollView, EventEmitter } from 'react-native'
import { HeaderBarDetail, PaddingView, ButtonCus } from '../../components'
// import InforBar from './InforBar'
// import SocialConnect from './SocialConnect'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'

import { screenHeight, dims } from '../../constants/dims'
import { responsiveFont } from '../../constants';
import { numberFormat } from '../../utils/format'

import HTML from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { keys } from '../../utils/asyncStorage'

import AsyncStorage from '@react-native-community/async-storage';

import { emitter } from '../../utils/eventEmitter'

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }
    componentDidMount() {
        const { pet } = this.props.route.params;
    }

    backButtonPressed = () => {
        this.props.navigation.pop();
    }

    homeButtonPressed = () => {
        this.props.navigation.popToTop();
    }

    cartButtonPressed = () => {
        this.props.navigation.navigate(
            'Cart', {}
        )
    }

    transformData = (array) => {
        let arrayPetId = []

        array.map(item => {
            arrayPetId.push(item.pet_id)
        })
        return arrayPetId;
    }

    checkDuplicate = (array, pet) => {
        return array.indexOf(pet);
    }

    addToCart = async (pet) => {
        let array = [];
        await AsyncStorage.getItem(keys.cart)
            .then((value) => {
                const _value = JSON.parse(value);
                if (!_value) {
                    const data = {
                        ...pet,
                        nums: 1,
                    }
                    array.push(data);
                    AsyncStorage.setItem(keys.cart, JSON.stringify(array),
                        this.setState({
                            modalVisible: true
                        }),

                    )
                    emitter.emit('RELOAD_CART')
                } else {
                    array = JSON.parse(value);
                    // const arrayPetId = this.transformData(array);
                    // console.log('$$$#', arrayPetId)

                    // const checked = this.checkDuplicate(arrayPetId, pet.pet_id);
                    // console.log('###', checked)
                    // if (checked) {
                    //     let petDuplicate = {
                    //         ...pet,
                    //         nums: nums + 1,
                    //     }
                    //     array.splice(checked, 0, petDuplicate)
                    // } else {
                    //     array.push(pet);
                    // }
                    array.map((item) => item.pet_id === pet.pet_id ? console.log('duplicate') : array.push(pet))
                    // array.push(pet)
                    AsyncStorage.setItem(keys.cart, JSON.stringify(array),
                        this.setState({
                            modalVisible: true
                        }))
                    emitter.emit('RELOAD_CART')
                }
            })
        // await AsyncStorage.removeItem(keys.cart)
    }

    closeModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    goToCartScreen = () => {
        this.setState({
            modalVisible: false
        })
        this.props.navigation.navigate('Cart')
    }

    render() {
        const { pet } = this.props.route.params;
        // console.log('###', pet.)

        const { pet_id, images, pet_description, price, promotion } = pet;

        return (

            <View style={{ flex: 1 }} >
                <HeaderBarDetail
                    onPressBack={this.backButtonPressed}
                    onPressHome={this.homeButtonPressed}
                    onPressCart={this.cartButtonPressed}
                />
                <ScrollView

                >
                    <KeyboardAwareScrollView
                        innerRef={ref => {
                            this.scroll = ref;
                        }}
                        enableResetScrollToCoords={false}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <PaddingView>
                            <View style={{ alignItems: 'center', paddingVertical: 16 }}>
                                <Image
                                    source={{ uri: images }}
                                    style={{ width: '100%', height: screenHeight * 0.6 }}
                                />
                            </View>
                            <View>
                                <Text style={styles.titleStyle}>{pet_description}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                    <Text style={styles.priceStyle}>{`${numberFormat(price)} đ`}</Text>
                                    {
                                        pet.promotion > 0 ?
                                            <React.Fragment>
                                                <Text style={[styles.titleStyle, { textDecorationLine: 'line-through' }]}>{`${numberFormat(price + (price * promotion / 100))} đ`}</Text>
                                                <Text>{`-${promotion}%`}</Text>
                                            </React.Fragment>
                                            :
                                            null
                                    }
                                </View>
                            </View>
                            <ButtonCus
                                title='Chọn mua'
                                style={{ backgroundColor: '#FE2E2E', paddingVertical: 12 }}
                                titleStyle={{ color: '#FFF', fontSize: responsiveFont(dims.Fonts.size.medium) }}
                                onPress={() => this.addToCart(pet)}
                            />
                            <HTML html={`<p>Giao hàng tới <b>address user</b></p>`} />
                            <Modal
                                animated='slide'
                                visible={this.state.modalVisible}
                                transparent={true}
                            >
                                <View style={styles.container}>
                                    <View style={styles.viewContainer}>
                                        {/* <Text>AAAA</Text> */}
                                        <View style={{ backgroundColor: '#FFF', borderRadius: 10 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 16 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Ionicons name={'ios-checkmark-circle-outline'} size={24} color={'#31B404'} />
                                                    <Text style={[styles.titleStyle, { color: '#31B404', paddingLeft: 10 }]}>Sản phẩm đã được thêm vào giỏ hàng</Text>
                                                </View>

                                                <TouchableOpacity onPress={this.closeModal}>
                                                    <Ionicons name={'ios-close'} size={30} color={'#000'} />
                                                </TouchableOpacity>

                                            </View>
                                            <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center', paddingHorizontal: 16 }}>
                                                <View style={{ flex: 0.2 }}>
                                                    <Image source={{ uri: images, height: 80 }} resizeMode='contain' />
                                                </View>
                                                <View style={{ flex: 0.8 }}>
                                                    <Text style={styles.titleStyle}>
                                                        {pet_description}
                                                    </Text>
                                                    <Text style={styles.priceStyle}>
                                                        {`${numberFormat(price)} đ`}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ padding: 16 }}>
                                                <ButtonCus
                                                    title='Xem giỏ hàng'
                                                    style={{ backgroundColor: '#FE2E2E', paddingVertical: 12 }}
                                                    titleStyle={{ color: '#FFF', fontSize: responsiveFont(dims.Fonts.size.medium) }}
                                                    onPress={() => this.goToCartScreen()}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </PaddingView>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleStyle: {
        fontSize: responsiveFont(dims.Fonts.size.small),
        paddingRight: 10
    },
    priceStyle: {
        fontSize: responsiveFont(dims.Fonts.size.medium),
        fontWeight: 'bold',
        paddingRight: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    viewContainer: {
        flex: 1,
        // paddingHorizontal: 40,
        // paddingBottom: 16,
        justifyContent: 'flex-end',
        borderRadius: 10,
    },
})

const mapStateToProps = (state) => ({
    // listPet: selectors.getListPet(state),
})

const mapDispatchToProps = (dispatch) => ({
    // getListPet: () => dispatch(actions.getListPet())
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);
