import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native'
import { numberFormat } from '../../utils/format'

import { dims, responsiveFont } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PaddingView, ButtonCus } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class CartProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    render() {
        const { listPets } = this.props;
        const { discountAmount } = this.state;
        const totalPrice = this.calculateTotalPrice(listPets, discountAmount)
        // this.props.getTotalPrice(totalPrice);
        return (
            <KeyboardAwareScrollView
                innerRef={ref => {
                    this.scroll = ref;
                }}
                enableResetScrollToCoords={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
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
            </KeyboardAwareScrollView >
        )
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: responsiveFont(dims.Fonts.size.small),
        paddingRight: 10
    },
    priceStyle: {
        fontSize: responsiveFont(dims.Fonts.size.medium),
        fontWeight: 'bold',
        paddingRight: 10,
    },
    textStyle: {
        fontSize: responsiveFont(dims.Fonts.size.medium),
        color: '#000',
        paddingVertical: 6
    },
    smallTextStyle: {
        fontSize: responsiveFont(dims.Fonts.size.smaller),
        color: '#BDBDBD'
    },
    button: {
        backgroundColor: '#BDBDBD',
        paddingHorizontal: 6,
    }
})


