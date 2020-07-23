import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { ButtonCus } from '../../../components'
import { Colors, responsiveFont, dims } from '../../../constants'

class PersonalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: ''
        }
    }
    componentDidMount() {
        const { userInfo } = this.props.route.params
        console.log('###', userInfo)
        this.setState({
            displayName: userInfo.displayName,
            email: userInfo.email
        })
    }
    render() {
        const { displayName, email } = this.state;
        return (
            <View style={styles.container}>
                <View >
                    <View style={styles.headerBlockStyle}>
                        <Text style={styles.textHeaderStyle}>Cá nhân</Text>
                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                        <Text style={styles.commonTextStyle}>Họ tên</Text>
                        <TextInput
                            style={{ borderBottomColor: Colors.grayText, borderBottomWidth: 0.75 }}
                            value={displayName}
                            onChangeText={(text) => {
                                this.setState({
                                    displayName: text
                                })
                            }}
                        />

                    </View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={styles.commonTextStyle}>Email</Text>
                        <TextInput
                            style={{ borderBottomColor: Colors.grayText, borderBottomWidth: 0.75 }}
                            value={email}
                            onChangeText={(text) => {
                                this.setState({
                                    email: text
                                })
                            }}
                        />
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, paddingVertical: 16, backgroundColor: Colors.white }}>
                    <ButtonCus
                        title='LƯU THAY ĐỔI'
                        style={{ backgroundColor: '#FE2E2E', borderRadius: 5, paddingVertical: 8, width: '100%' }}
                        titleStyle={{ color: '#FFF', fontSize: responsiveFont(dims.Fonts.size.medium) }}
                    // onPress={this._goToPaymentStep2}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    headerBlockStyle: {
        backgroundColor: Colors.gray
    },
    textHeaderStyle: {
        fontSize: responsiveFont(dims.Fonts.size.small),
        paddingVertical: 16,
        paddingHorizontal: 20
    },
    commonTextStyle: {
        fontSize: responsiveFont(dims.Fonts.size.smaller),
    }
})

export default PersonalScreen


