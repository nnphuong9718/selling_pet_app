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

    goToStep4 = () => {
        const { amount } = this.props.route.params;
        // console.log('###', amount);
        const onSuccess = () => {
            this.props.navigation.navigate('Payment4', {
                paymentType: 'test',
                transferType: 'test',
            })
        }
        const onError = () => {
            console.log('###, onError');
        }
        const paymentInfo = {
            amount,
            billId: this.generateBillCode(),
            createDate: new Date().getTime(),
            paymentType: 'COD',
            petId: `1,2`,
            transferTime: new Date().getTime() + 2 * 24 * 60 * 60 * 1000,
            userId: 1,
        }
        this.props.paymentBill(paymentInfo, onSuccess, onError)
    }

    render() {
        const { userAddress } = this.props;
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
                            Test
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
                            Test
                        </Text>
                    </View>
                    <View style={styles.containerBlockView}>
                        <Text style={styles.titleText}>
                            Hình thức thanh toán
                        </Text>
                        <Text style={styles.valueText}>
                            Test
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
