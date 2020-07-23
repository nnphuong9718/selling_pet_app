import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { ButtonCus, Popup } from '../../../components'
import { Colors, responsiveFont, dims } from '../../../constants'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth'

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            password: '',
            address: '',
            registerSuccess: false,
        }
    }
    componentDidMount() {
        // const { userInfo } = this.props.route.params
        // console.log('###', userInfo)
        // this.setState({
        //     displayName: userInfo.displayName,
        //     email: userInfo.email
        // })
    }

    generateUserId = () => {
        return `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
    }

    signUpFirebase = () => {
        let uid = ''
        const { fullName, phoneNumber, email, password, address } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then((value) => {
            this.setState({
                registerSuccess: true,
            })
            uid = value.user.uid
            firebase.database().ref(`users/${uid}`).set(
                {
                    address,
                    fullName,
                    password,
                    email,
                    phoneNumber,
                    username: '',
                    uid,
                }
            ).then(() => {

            })
                .catch(error => { console.log(error) })
        })
            .catch((error) => console.log('###', error));

    }
    hidePoup = () => {
        this.setState({
            registerSuccess: false
        })
    }

    backToLogin = () => {
        this.setState({
            registerSuccess: false,
        })
        this.props.navigation.navigate('Đăng nhập')
    }

    render() {
        const { fullName, phoneNumber, email, password, address } = this.state;
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                            <TextInput
                                placeholder="Họ tên"
                                style={{ borderBottomColor: Colors.grayText, borderBottomWidth: 0.75 }}
                                value={fullName}
                                onChangeText={(text) => {
                                    this.setState({
                                        fullName: text
                                    })
                                }}

                            />

                        </View>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                            <TextInput
                                placeholder="Số điện thoại"
                                keyboardType={'numeric'}
                                style={{ borderBottomColor: Colors.grayText, borderBottomWidth: 0.75 }}
                                value={phoneNumber}
                                onChangeText={(text) => {
                                    this.setState({
                                        phoneNumber: text
                                    })
                                }}

                            />

                        </View>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                            <TextInput
                                placeholder="Email"
                                style={{ borderBottomColor: Colors.grayText, borderBottomWidth: 0.75 }}
                                value={email}
                                onChangeText={(text) => {
                                    this.setState({
                                        email: text
                                    })
                                }}

                            />

                        </View>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                            <TextInput
                                placeholder="Mật khẩu"
                                style={{ borderBottomColor: Colors.grayText, borderBottomWidth: 0.75 }}
                                value={password}
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text
                                    })
                                }}
                                secureTextEntry={true}

                            />

                        </View>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                            <TextInput
                                placeholder="Địa chỉ"
                                style={{ borderBottomColor: Colors.grayText, borderBottomWidth: 0.75 }}
                                value={address}
                                onChangeText={(text) => {
                                    this.setState({
                                        address: text
                                    })
                                }}

                            />

                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
                        <ButtonCus
                            title='ĐĂNG KÝ'
                            style={{ backgroundColor: '#FE2E2E', borderRadius: 5, paddingVertical: 8, width: '100%' }}
                            titleStyle={{ color: '#FFF', fontSize: responsiveFont(dims.Fonts.size.medium) }}
                            onPress={this.signUpFirebase}
                        />
                    </View>

                </View>
                <Popup
                    modalVisible={this.state.registerSuccess}
                    title={'Chúc mừng!'}
                    message={'Bạn đã đăng ký thành công'}
                    numberOfButtons={1}
                    onCancel={this.hidePoup}
                    onSubmit={this.backToLogin}
                    titleSubmit={'Đăng nhập ngay!'}
                />
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default SignUpScreen


