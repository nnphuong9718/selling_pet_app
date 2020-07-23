import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import HeaderBarPayment from './HeaderBarPayment'
import { dims, responsiveFont, Colors } from '../../constants'
import { BlockView, ButtonCus } from '../../components'
import { styles } from './styles'
// import { TouchableOpacity } from 'react-native-gesture-handler'

const optionsTransfer = [
    {
        id: 0,
        description: 'Nhận hàng sau 2 ngày',
        price: 200000,
        selected: true,
    },
]

const optionsPayment = [
    {
        id: 0,
        description: 'COD',
        selected: true,
    },

]

export default class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxTransferId: 0,
            checkboxPaymentIndex: 0,
        }
    }

    onChangeCheckBox = (id) => {

        // console.log('###', id)

        this.setState({
            checkboxTransferId: id
        })

        optionsPayment[id] = {
            ...optionsTransfer[id],
            selected: true
        }

        // console.log('###', optionsPayment[index])

    }

    renderCheckbox = (option) => {
        // console.log(option);
        const { item } = option;
        // console.log('###', item)

        const { checkboxTransferId } = this.state;


        // console.log('###', option)
        return (
            <View style={styles2.containerChoose}>
                <TouchableOpacity
                    onPress={() => this.onChangeCheckBox(item.id)}
                    style={[styles.circleBorder, { width: 24, height: 24, borderRadius: 24 / 2, backgroundColor: Colors.white, borderColor: Colors.blue, borderWidth: 1 }]}>
                    <View style={item.selected ? styles.smallCircleBorder : styles.smallCircleBorderUnSelect}>
                    </View>
                </TouchableOpacity>
                <View style={{ paddingLeft: 8 }}>
                    <Text>{`${item.description} (${item.price ? item.price : ''})`}</Text>
                </View>
            </View>
        )
    }
    goToStep3 = () => {
        const { amount, listPets, userInfor } = this.props.route.params;
        const sumAmount = amount + parseInt(optionsTransfer[0].price);
        this.props.navigation.navigate('Payment3',
            {
                amount: sumAmount,
                listPets,
                userInfor,
                paymentType: optionsPayment[0].description,
                transferType: optionsTransfer[0].description
            });
    }
    render() {
        return (
            <View style={styles2.container}>
                <HeaderBarPayment
                    indexStep={2} />
                <ScrollView>
                    {/* <BlockView
                        title={'Hình thức giao hàng'}
                        leftComponent={<View style={{ flex: 1 }}><Text>HEHE</Text></View>}
                        rightComponent={<View style={{ flex: 5 }}><Text>HIHI</Text></View>}
                    /> */}
                    <View style={{ flex: 1 }}>
                        <View style={{ backgroundColor: Colors.white }}>
                            <View style={{ backgroundColor: '#E6E6E6', paddingBottom: 10, paddingHorizontal: 20 }}>
                                <Text>Hình thức giao hàng</Text>
                            </View>
                            <View style={{ paddingVertical: 10, paddingHorizontal: 20, }}>
                                {/* {this.renderCheckbox(options)} */}
                                <FlatList
                                    keyExtractor={item => `${item.id}`}
                                    data={optionsTransfer}
                                    renderItem={(option) => this.renderCheckbox(option)}
                                />
                            </View>
                        </View>
                        <View style={{ backgroundColor: Colors.white, marginTop: 10 }}>
                            <View style={{ backgroundColor: '#E6E6E6', paddingBottom: 10, paddingHorizontal: 20 }}>
                                <Text>Hình thức thanh toán</Text>
                            </View>
                            <View style={{ paddingVertical: 10, paddingHorizontal: 20, }}>
                                {/* {this.renderCheckbox(options)} */}
                                <FlatList
                                    keyExtractor={item => `${item.id}`}
                                    data={optionsPayment}
                                    renderItem={(option) => this.renderCheckbox(option)}
                                />
                            </View>
                        </View>

                    </View>
                </ScrollView>
                <View style={{ backgroundColor: Colors.white }}>
                    <View style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
                        <ButtonCus
                            title="Tiếp tục"
                            style={{ backgroundColor: '#FE2E2E', borderRadius: 5, paddingVertical: 8, width: '100%' }}
                            titleStyle={{ color: '#FFF', fontSize: responsiveFont(dims.Fonts.size.medium) }}
                            onPress={this.goToStep3}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles2 = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray,
        flex: 1,
        justifyContent: 'space-between'
    },
    containerChoose: {
        flexDirection: 'row',
        paddingBottom: 8
        // flex: 1,
    }
})
