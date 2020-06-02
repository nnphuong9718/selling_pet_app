import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { PaddingView, ButtonCus } from '../../../components'
import { responsiveFont, dims } from '../../../constants'
import auth from '@react-native-firebase/auth';




class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    onSubmit = () => {
        console.log('##login')
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Email/Số điện thoại"
                            placeholderTextColor="#000"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Mật khẩu"
                            placeholderTextColor="#000"
                            style={styles.input}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ButtonCus
                            style={{ backgroundColor: '#FE2E2E', marginVertical: 16 }}
                            title='Đăng nhập'
                            titleStyle={styles.titleStyle}
                            onPress={this.onSubmit}
                        />
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textStyle}>
                                Quên mật khẩu?
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 3 }}>

                        <Text style={[styles.textStyle, { color: '#000', alignSelf: 'center' }]}>
                            Hoặc đăng nhập với
                        </Text>
                        <View>

                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        paddingTop: 26,
        paddingBottom: 8,
        borderBottomWidth: 0.75,
        borderBottomColor: '#BDBDBD'
    },
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    titleStyle: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: responsiveFont(dims.Fonts.size.small),
        paddingVertical: 16,
    },
    textStyle: {
        color: '#1A9EFF',
        fontSize: responsiveFont(dims.Fonts.size.smaller)
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoginScreen;
