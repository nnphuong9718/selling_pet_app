import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, dims, responsiveFont } from '../../constants/'
import { ButtonCus } from '../../components'
import { styles } from './styles'
import { connect } from 'react-redux';
import * as AsyncStorage from '../../utils/asyncStorage'



class Step4 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        const { keys, removeItem } = AsyncStorage;
        removeItem(keys.cart);

    }
    // _goToPaymentStep2 = () => {
    //     this.props.navigation.navigate('Payment2',
    //         {
    //         });
    // }

    render() {
        const { transferType, paymentType } = this.props.route.params;

        return (
            <View style={styles.container}>
                <View style={[styles.containerBlockView, { marginTop: 0 }]}>
                    <View style={{ alignItems: 'center', paddingVertical: 16 }}>
                        <Ionicons name="ios-checkmark-circle-outline" color={Colors.green} size={80} />
                        <Text style={[styles.valueText, { color: Colors.green }]}>Đặt hàng thành công!</Text>
                    </View>
                    <Text style={styles.titleText}>
                        Cảm ơn bạn đã mua sắm tại All 4 Pet với mã đơn hàng:
                        <Text style={[styles.titleText, { color: '#FFBF00' }]}>
                            {` Test`}
                        </Text>
                    </Text>
                    <View style={{ paddingVertical: 16 }}>
                        <View style={styles.rowStyle}>
                            <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: Colors.orange, marginRight: 10 }}>
                            </View>
                            <Text style={styles.valueText}>Giao vào
                                <Text style={styles.valueText}>{` ${transferType}`}</Text>
                            </Text>
                        </View>
                        <View style={[styles.rowStyle, { paddingVertical: 10 }]}>
                            <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: Colors.orange, marginRight: 10 }}>
                            </View>
                            <Text style={styles.valueText}>Giao vào
                                <Text style={styles.valueText}>{` ${transferType}`}</Text>
                            </Text>
                        </View>
                        <View style={styles.rowStyle}>
                            <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: Colors.orange, marginRight: 10 }}>
                            </View>
                            <Text style={styles.valueText}>Giao vào
                                <Text style={styles.valueText}>{` ${transferType}`}</Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.containerBlockView}>
                    <ButtonCus
                        title="TIẾP TỤC MUA SẮM"
                        style={{ backgroundColor: '#FE2E2E', borderRadius: 5, paddingVertical: 8, width: '100%', marginBottom: 8 }}
                        titleStyle={{ color: '#FFF', fontSize: responsiveFont(dims.Fonts.size.medium), fontWeight: '500' }}
                        onPress={() => this.props.navigation.popToTop()}
                    />
                    <ButtonCus
                        title="XEM ĐƠN HÀNG"
                        style={{ backgroundColor: Colors.white, borderRadius: 5, paddingVertical: 8, width: '100%', borderWidth: 0.5, borderColor: Colors.blue }}
                        titleStyle={{ color: Colors.blue, fontSize: responsiveFont(dims.Fonts.size.medium), fontWeight: '500' }}
                        onPress={() => { }}
                    />
                </View>
            </View >
        )
    }
}

const mapStateToProps = (state) => ({

    // userAddress: selectors.getUserAddress(state),
})

const mapDispatchToProps = (dispatch) => ({

    // getUserAddress: () => dispatch(actions.getUserAddress())
})

export default connect(mapStateToProps, mapDispatchToProps)(Step4); 
