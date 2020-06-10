import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native'
import { HeaderBarDetail, ListItem, PaddingView, ButtonCus } from '../../components'
// import InforBar from './InforBar'
import { images, icons } from '../../assets';
// import SocialConnect from './SocialConnect'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'

import { screenWidth, screenHeight, dims, isIPhoneX } from '../../constants/dims'
import { responsiveFont } from '../../constants';
import { numberFormat } from '../../utils/format'

import HTML from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CartProducts from './CartProducts'

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 0,
            petCount: 1,
            promotionCode: '',
            discountAmount: 0
        }
    }

    renderItem = (item) => {
        const { pet_id, images, promotion, pet_description, pet_name, price, category_id } = item.item;
        console.log('##', item);
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
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity
                                style={styles.button}>
                                <Ionicons name={'ios-remove'} size={18} color={'#000'} />
                            </TouchableOpacity>
                            <Text style={[styles.titleStyle, { paddingHorizontal: 8 }]}>
                                {this.state.petCount}
                            </Text>
                            <TouchableOpacity style={styles.button}>
                                <Ionicons name={'ios-add'} size={18} color={'#000'} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ flex: 0.1, alignItems: 'center' }}>
                        <Ionicons name={'ios-close'} size={30} color={'#BDBDBD'} />
                    </View>
                </View>

            </View>
        )
    }
    onChangePromotionCode = (text) => {
        this.setState({
            promotionCode: text
        })
    }

    calculateTotalPrice = (listPets, discount) => {
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

    _goToPaymentStep1 = () => {
        this.props.navigation.navigate(
            'Payment1',
            { user_id: '' }
        )
    }



    render() {
        const listPets = [
            {
                category_id: 2,
                images: "https://www.upsieutoc.com/images/2020/06/07/pet_6.jpg",
                pet_description: "Chó corgy 6 tháng tuổi lông vàng",
                pet_id: 1,
                pet_name: "Chó corgy",
                price: 1200000,
                promotion: 20,
            },
            {
                category_id: 2,
                images: "https://www.upsieutoc.com/images/2020/06/07/pet_7.jpg",
                pet_description: "Chó husky 1 năm tuổi",
                pet_id: 2,
                pet_name: "Chó husky",
                price: 2500000,
                promotion: 0,
            }
        ]
        const { discountAmount } = this.state;
        const totalPrice = this.calculateTotalPrice(listPets, discountAmount)
        return (

            <View style={{ flex: 1, backgroundColor: '#A4A4A4' }}>
                <View style={{ flex: 0.8 }}>
                    {listPets && listPets.length > 0 ?

                        <>
                            <FlatList
                                keyExtractor={item => `${item.pet_id}`}
                                data={listPets}
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
                                <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'flex-end', paddingBottom: 16 }}>
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
                            <PaddingView style={{ backgroundColor: '#FFF', marginTop: 10, paddingVertical: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.smallTextStyle}>
                                    Tạm tính
                                 </Text>
                                <Text>
                                    {`${numberFormat(totalPrice)} đ`}
                                </Text>
                            </PaddingView>
                        </>
                        // </KeyboardAwareScrollView>
                        : null
                    }
                </View>
                <PaddingView style={{ flex: 0.2, backgroundColor: '#FFF' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                        <Text style={styles.smallTextStyle}>
                            Thành tiền
                        </Text>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.priceText}>
                                {/* {`${numberFormat(this.state.totalPrice)} đ`} */}
                            </Text>
                            <Text style={[styles.smallTextStyle, { color: '#000' }]}>
                                Đã bao gồm VAT
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <ButtonCus
                            title='TIẾN HÀNH ĐẶT HÀNG'
                            style={{ backgroundColor: '#FE2E2E', paddingVertical: 8, borderRadius: 5 }}
                            titleStyle={{ color: '#FFF', fontSize: responsiveFont(dims.Fonts.size.medium) }}
                            onPress={() => this._goToPaymentStep1()}
                        />
                    </View>
                </PaddingView>
            </View>



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
