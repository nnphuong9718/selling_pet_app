import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TouchableWithoutFeedback, FlatList, TextInput, ScrollView } from 'react-native'
import { PaddingView, ButtonCus } from '../../components'
// import InforBar from './InforBar'
import { images, icons } from '../../assets';
// import SocialConnect from './SocialConnect'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'

import { dims } from '../../constants/dims'
import { responsiveFont } from '../../constants';
import { numberFormat } from '../../utils/format'

import Ionicons from 'react-native-vector-icons/Ionicons'


import * as AsyncStorage from '../../utils/asyncStorage';
import { emitter } from '../../utils/eventEmitter'

// import AsyncStorage from '@react-native-community/async-storage'

import _ from 'lodash'

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPets: [],
            totalPrice: 0,
            petCount: 1,
            promotionCode: '',
            discountAmount: 0,
            userInfor: {}
        }
    }

    async componentDidMount() {
        const { keys, getItem } = AsyncStorage;
        const data = await getItem(keys.cart);
        const _data = JSON.parse(data);
        // console.log('##', _data)
        this.setState({
            listPets: _data
        })
        await getItem(keys.userInforFull).then(value => {
            this.setState({
                userInfor: JSON.parse(value),
            })
        })
        emitter.emit('RELOAD_CART', 10);
    }

    transformData = (array) => {

    }

    onRemoveItem = async (item) => {
        const { keys, setItem, removeItem } = AsyncStorage;

        console.log(item.pet_id);

        const { listPets } = this.state;

        console.log('list', listPets)


        console.log('###', listPets.indexOf(item))
        if (listPets.length === 1) {
            this.setState({
                listPets: []
            })
            await removeItem(keys.cart);
            emitter.emit('RELOAD_CART', 10)
        }
        else {
            listPets.map(pet => pet.pet_id === item.pet_id ?

                // await removeItem(keys.cart, item)
                // console.log('###', listPets)
                this.setState({
                    listPets: listPets.splice(listPets.indexOf(item), 1)
                })
                : console.log('false'));

            console.log('###', listPets)
            await setItem(keys.cart, JSON.stringify(listPets))
            emitter.emit('RELOAD_CART', 10)
        }
        // console.log('###', item)
    }



    renderItem = (item) => {
        const { pet_id, images, promotion, pet_description, pet_name, price, category_id } = item.item;
        // console.log('###', item)
        // console.log('##', item);
        return (
            <View>
                <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#FFF' }}>
                    <View style={{ flex: 0.2, paddingRight: 16 }}>
                        <Image source={{ uri: images, height: 120 }} resizeMode='contain' />
                    </View>
                    <View style={{ flex: 0.7, justifyContent: 'center' }}>
                        <Text style={styles.titleStyle}>
                            {pet_description}
                        </Text>
                        <Text style={[styles.priceStyle, { paddingVertical: 6 }]}>
                            {`${numberFormat(price)} đ`}
                        </Text>

                    </View>
                    <TouchableOpacity
                        onPress={() => this.onRemoveItem(item.item)}
                        style={{ flex: 0.1, alignItems: 'center' }}
                    >
                        <Ionicons name={'ios-close'} size={30} color={'#BDBDBD'} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    onChangePromotionCode = (text) => {
        this.setState({
            promotionCode: text
        })
    }

    calculateTotalPrice = (discount) => {

        const { listPets } = this.state;
        let totalPrice = 0;
        listPets.forEach(pet => {
            totalPrice += pet.price;
        })
        return discount ? totalPrice * (100 - discount) / 100 : totalPrice;
    }
    discountAmount = () => {
        const { promotionCode } = this.state;
        if (promotionCode === 'TEST') {
            this.setState({
                discountAmount: 20
            })
        }
        else {
            this.setState({
                discountAmount: 0
            })
        }
    }

    _goToPaymentStep1 = (totalPrice, listPets) => {
        const { userInfor } = this.state;
        if (!userInfor) {
            this.props.navigation.navigate('Cá nhân')
            setTimeout(() => this.props.navigation.navigate('UserScreen'), 10)

        } else {
            this.props.navigation.navigate(
                'Payment1',
                {
                    user_id: '',
                    amount: totalPrice,
                    listPets,
                    userInfor
                }
            )
        }
    }

    backToHome = () => {
        this.props.navigation.popToTop(
            { reload: 'abc' }
        )

    }





    render() {

        const { listPets, discountAmount } = this.state;

        // console.log('###', listPets)
        // const object = this.transformData(listPets || [])

        const totalPrice = listPets ? this.calculateTotalPrice(discountAmount) : 0;



        return (

            <View style={{ flex: 1, backgroundColor: '#E6E6E6' }}>

                {listPets && listPets.length > 0 ?
                    <React.Fragment>
                        <KeyboardAwareScrollView
                            innerRef={ref => {
                                this.scroll = ref;
                            }}
                            enableResetScrollToCoords={false}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            {/* <ScrollView> */}
                            {/* <ScrollView> */}
                            <FlatList
                                // keyExtractor={item => `${item.pet_id}`}
                                data={listPets || []}
                                renderItem={(item) => this.renderItem(item)}
                            >
                            </FlatList>
                            <View style={{ backgroundColor: '#FFF', marginTop: 10, }}>
                                {/* <PaddingView> */}
                                <View style={{ borderBottomColor: '#000', borderBottomWidth: 0.7 }}>
                                    <Text style={[styles.titleStyle, { paddingHorizontal: 20, paddingVertical: 16 }]}>
                                        Nhập mã giảm giá
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'flex-end', paddingBottom: 16, }}>
                                    <View style={{ flex: 0.8 }}>
                                        <TextInput
                                            placeholder={'Nhập mã giảm giá'}
                                            onChangeText={(text) => this.onChangePromotionCode(text)}
                                            placeholderTextColor={'#000'}
                                            style={{
                                                borderBottomColor: '#BDBDBD',
                                                borderBottomWidth: 0.7
                                            }}

                                        />
                                    </View>
                                    <View style={{ flex: 0.2 }}>
                                        <ButtonCus
                                            title={'GỬI'}
                                            titleStyle={{ color: '#FFF', }}
                                            style={{ padding: 10, backgroundColor: '#00BFFF', borderRadius: 5, marginLeft: 5 }}
                                            onPress={() => this.discountAmount()}

                                        />
                                    </View>
                                </View>
                                {/* </PaddingView> */}
                            </View>
                            <PaddingView style={{ backgroundColor: '#FFF', marginVertical: 10, paddingVertical: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.smallTextStyle}>
                                    Tạm tính
                                 </Text>
                                <Text>
                                    {`${numberFormat(totalPrice)} đ`}
                                </Text>
                            </PaddingView>
                            {/* </ScrollView> */}
                        </KeyboardAwareScrollView>
                        <PaddingView style={{ backgroundColor: '#FFF', justifyContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                                <Text style={styles.smallTextStyle}>
                                    {'Thành tiền'}
                                </Text>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.priceText}>
                                        {`${numberFormat(totalPrice)} đ`}
                                    </Text>
                                    <Text style={[styles.smallTextStyle, { color: '#000' }]}>
                                        {'Đã bao gồm VAT'}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ paddingVertical: 10 }}>
                                <ButtonCus
                                    title='TIẾN HÀNH ĐẶT HÀNG'
                                    style={{ backgroundColor: '#FE2E2E', paddingVertical: 8, borderRadius: 5 }}
                                    titleStyle={{ color: '#FFF', fontSize: responsiveFont(dims.Fonts.size.medium) }}
                                    onPress={() => this._goToPaymentStep1(totalPrice, listPets)}
                                />
                            </View>

                        </PaddingView>
                    </React.Fragment>

                    : <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.3, alignItems: 'center', paddingVertical: 16 }}>
                            <Image source={images.emptyCart} resizeMode="contain" style={{ width: '100%', height: '100%' }} />

                        </View>
                        <View style={{ flex: 0.1, alignItems: 'center' }}>
                            <Text style={{ fontSize: responsiveFont(dims.Fonts.size.small), marginTop: 10 }}>Bạn chưa có sản phẩm nào trong giỏ hàng</Text>
                        </View>
                        <View style={{ flex: 0.6, paddingHorizontal: 20 }}>
                            <ButtonCus
                                title="TIẾP TỤC MUA SẮM"
                                style={{ backgroundColor: '#FE2E2E', borderRadius: 5, paddingVertical: 8, width: '100%', marginBottom: 8 }}
                                titleStyle={{ color: '#FFF', fontSize: responsiveFont(dims.Fonts.size.medium), fontWeight: '500' }}
                                onPress={this.backToHome}
                            />
                        </View>
                    </View>
                }


            </View >
        )
    }
}

const styles = StyleSheet.create({
    smallTextStyle: {
        fontSize: responsiveFont(dims.Fonts.size.smaller),
        color: '#BDBDBD'
    },
    priceText: {
        fontSize: responsiveFont(dims.Fonts.size.medium),
        color: '#FE2E2E'
    }
})
