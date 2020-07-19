import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, dims, responsiveFont } from '../../constants/'
import { PaddingView, ButtonCus } from '../../components'
import { styles } from './styles'
import { connect } from 'react-redux';
import HeaderBarPayment from './HeaderBarPayment'
import { selectors, actions } from './services'




class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.props.getUserAddress();
        const { amount } = this.props.route.params;
        console.log('####', amount);
    }
    _goToPaymentStep2 = () => {
        const { amount } = this.props.route.params;
        this.props.navigation.navigate('Payment2',
            {
                amount,
            });
    }

    render() {
        const { userAddress } = this.props;
        // console.log('@@@', userAddress);
        return (
            <View style={styles.container}>
                <View>
                    <HeaderBarPayment
                        indexStep={1}
                    />
                    <View style={styles.boxStyle}>

                        <View style={{ flex: 1 }}>
                            <View style={[styles.circleBorder, { width: 24, height: 24, borderRadius: 24 / 2, backgroundColor: Colors.white, borderColor: Colors.blue, borderWidth: 1 }]}>
                                <View style={styles.smallCircleBorder}>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text>Phuonggg</Text>
                            <Text>
                                {userAddress && userAddress[0] ? userAddress[0].user_address : ''}
                            </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name={'ios-close'} size={24} color={Colors.gray} />
                            <Ionicons name={'ios-create'} size={24} color={Colors.gray} />
                        </View>

                    </View>
                    <View style={styles.boxStyle}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Ionicons name={'ios-add-circle'} size={24} color={Colors.blue} />
                            <TouchableOpacity
                                style={{ marginLeft: 16 }}
                                onPress={() => { }}
                            >
                                <Text style={styles.textStyle}>
                                    Thêm địa chỉ mới
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>

                <View style={{ backgroundColor: Colors.white }}>
                    <View style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
                        <ButtonCus
                            title='GIAO ĐẾN ĐỊA CHỈ NÀY'
                            style={{ backgroundColor: '#FE2E2E', borderRadius: 5, paddingVertical: 8, width: '100%' }}
                            titleStyle={{ color: '#FFF', fontSize: responsiveFont(dims.Fonts.size.medium) }}
                            onPress={this._goToPaymentStep2}
                        />
                    </View>
                </View>

            </View >
        )
    }
}

const mapStateToProps = (state) => ({
    // listPet: selectors.getListPet(state),
    userAddress: selectors.getUserAddress(state),
})

const mapDispatchToProps = (dispatch) => ({
    // getListPet: () => dispatch(actions.getListPet())
    getUserAddress: () => dispatch(actions.getUserAddress())
})

export default connect(mapStateToProps, mapDispatchToProps)(Step1); 
