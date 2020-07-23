import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, dims, responsiveFont } from '../../constants/'
import { PaddingView, ButtonCus } from '../../components'
import { styles } from './styles'
import { connect } from 'react-redux';
import HeaderBarPayment from './HeaderBarPayment'
import { selectors, actions } from './services'




class Step3 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        // this.props.getUserAddress();
    }

    generateBillCode = () => {
        return `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
    }

    transformData = (array) => {
        let arrayPetId = []

        array.map(item => {
            arrayPetId.push(item.pet_id)
        })
        return arrayPetId;
    }

    goToStep4 = () => {
        const { amount, listPets, userInfor, paymentType, transferType } = this.props.route.params;

        const billId = this.generateBillCode();
        // console.log('###', amount);
        const onSuccess = () => {
            this.props.navigation.navigate('Payment4', {
                paymentType: paymentType,
                transferType: transferType,
                billId,
                amount,
                transferTime: new Date().getTime() + 2 * 24 * 60 * 60 * 1000,
            })
        }
        const onError = () => {
            console.log('###, onError');
        }

        const arrayId = this.transformData(listPets);
        const paymentInfo = {
            amount,
            billId,
            createDate: new Date().getTime(),
            paymentType: 'COD',
            petId: JSON.stringify(arrayId),
            transferTime: new Date().getTime() + 2 * 24 * 60 * 60 * 1000,
            userId: userInfor.uid,
            phoneNumer: userInfor.phoneNumber,
            address: userInfor.address
        }
        this.props.paymentBill(paymentInfo, onSuccess, onError)
    }

    render() {
        const { userAddress } = this.props;
        const { amount, listPets, userInfor, paymentType, transferType } = this.props.route.params;
        return (
            <View style={styles.container}>
                <HeaderBarPayment
                    indexStep={3} />
                <ScrollView>
                    <View style={styles.containerBlockView}>
                        <Text style={styles.titleText}>
                            Địa chỉ người nhận
                        </Text>
                        <Text style={styles.titleText}>
                            {userInfor.address}
                        </Text>
                        <Text style={styles.valueText}>
                            {userAddress && userAddress[0] ? userAddress[0].user_address : ''}
                        </Text>
                    </View>
                    <View style={styles.containerBlockView}>
                        <Text style={styles.titleText}>
                            Hình thức giao hàng
                        </Text>
                        <Text style={styles.valueText}>
                            {transferType}
                        </Text>
                    </View>
                    <View style={styles.containerBlockView}>
                        <Text style={styles.titleText}>
                            Hình thức thanh toán
                        </Text>
                        <Text style={styles.valueText}>
                            {paymentType}
                        </Text>
                    </View>
                    <View></View>

                </ScrollView>
                <View style={{ backgroundColor: Colors.white }}>
                    <View style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
                        <ButtonCus
                            title="Thanh toán"
                            style={{ backgroundColor: '#FE2E2E', borderRadius: 5, paddingVertical: 8, width: '100%' }}
                            titleStyle={{ color: '#FFF', fontSize: responsiveFont(dims.Fonts.size.medium) }}
                            onPress={this.goToStep4}
                        />
                    </View>
                </View>
            </View>

        )
    }
}

// const styles = StyleSheet.create({

// })

const mapStateToProps = (state) => ({
    userAddress: selectors.getUserAddress(state),

})

const mapDispatchToProps = (dispatch) => ({
    paymentBill: (payload, onSuccess, onError) => dispatch(actions.paymentBill(payload, onSuccess, onError))
})

export default connect(mapStateToProps, mapDispatchToProps)(Step3); 
