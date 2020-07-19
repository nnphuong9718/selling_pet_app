import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { styles } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../../constants';
import { images, icons } from '../../../assets'

export default class HeaderBarPayment extends Component {
    render() {
        const { indexStep } = this.props;
        return (
            <View style={styles.containerTopBar}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.circleBorder}>
                        <Ionicons
                            name="ios-locate"
                            size={24}
                            color={'#FFF'}
                        />

                    </View>
                    <Text style={styles.valueTextSelected}>Địa chỉ</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[styles.circleBorder, { backgroundColor: indexStep > 1 ? Colors.blue : Colors.gray }]}>
                        <Ionicons
                            name={'ios-wallet'}
                            size={24}
                            color={Colors.white}
                        />

                    </View>
                    <Text style={indexStep > 1 ? styles.valueTextSelected : styles.valueText}>Thanh toán</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[styles.circleBorder, { backgroundColor: indexStep === 3 ? Colors.blue : Colors.gray }]}>
                        <Ionicons
                            name="ios-checkmark"
                            size={24}
                            color={'#FFF'}
                        />
                    </View>
                    <Text style={indexStep === 3 ? styles.valueTextSelected : styles.valueText}>Xác nhận</Text>
                </View>

            </View>
        )
    }
}
