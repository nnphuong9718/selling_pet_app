import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { PaddingView, ButtonCus } from '../../../components'
import { responsiveFont, dims } from '../../../constants'
import auth from '@react-native-firebase/auth';

import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin'

import AsyncStorage from '@react-native-community/async-storage';

import { keys } from '../../../utils/asyncStorage';

GoogleSignin.configure({
    webClientId: '36431363713-74li3qgt7diqvgoa71ohkeijkembj9br.apps.googleusercontent.com'
})



class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            initializing: true,
            user: {},
            isSigningIn: false,
            idToken: '',
        }
    }

    onAuthStateChanged = async (user) => {


        if (user) {
            this.props.navigation.navigate('Cá nhân', {
                userInfo: user._user
            })
            AsyncStorage.setItem(keys.firebase, this.state.idToken)
            AsyncStorage.setItem(keys.userInfo, JSON.stringify(user._user.providerData[0]))
        }
    }
    onSubmit = () => {
        auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    removeInfo = async () => {
        await AsyncStorage.removeItem(keys.firebase)
        await AsyncStorage.removeItem(keys.userInfo,
            this.props.navigation.navigate('Cá nhân', {
            })
        )
    }

    signOut = async () => {
        // auth().signOut().then(() => {
        //     auth().onAuthStateChanged(this.onAuthStateChanged);
        //     await GoogleSignin.revokeAccess()
        // })
        try {
            await GoogleSignin.revokeAccess();
            auth().signOut().then(() => {
                auth().onAuthStateChanged(this.onAuthStateChanged);
                this.removeInfo;

            })
        }
        catch (error) {
            Alert.alert('@@@ something wrong')
        }
    }

    onGoogleSignIn = async () => {
        console.log('@@@')
        this.setState({
            isSigningIn: true
        })
        const { idToken, user } = await GoogleSignin.signIn();

        this.setState({
            idToken: idToken,
        })
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }
    render() {
        // console.log('####', this.state.user)
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Email/Số điện thoại"
                            placeholderTextColor="#000"
                            style={styles.input}
                            onChangeText={(text) => {
                                this.setState({
                                    username: text
                                })
                            }}
                            autoCorrect={false}
                        />
                        <TextInput
                            placeholder="Mật khẩu"
                            placeholderTextColor="#000"
                            style={styles.input}
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                            autoCorrect={false}
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
                        <View style={{ flex: 1 }}>


                            <Text style={[styles.textStyle, { color: '#000', alignSelf: 'center' }]}>
                                Hoặc đăng nhập với
                        </Text>
                        </View>
                        <View style={{ flex: 4, alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>

                                <TouchableOpacity
                                    onPress={() => this.onGoogleSignIn().then(() => {
                                        this.setState({
                                            isSigningIn: false
                                        })
                                        auth().onAuthStateChanged(this.onAuthStateChanged)
                                    })}>
                                    {/* <GoogleSigninButton
                                    color={GoogleSigninButton.Color.Dark}
                                    size={GoogleSigninButton.Size.Standard}
                                    onPress={() => this.onGoogleSignIn().then(() => {
                                        this.setState({
                                            isSigningIn: false
                                        })
                                        console.log('####', this.state.isSigningIn)
                                        console.log('Signed in with Google!')
                                    })}
                                // disabled={this.state.isSigningIn}
                                /> */}
                                    <GoogleSigninButton
                                        color={GoogleSigninButton.Color.Dark}
                                        size={GoogleSigninButton.Size.Wide}
                                        onPress={() => { }}
                                    />
                                </TouchableOpacity>
                            </View>


                            {/* <TouchableOpacity
                                style={{ flex: 1, backgroundColor: '#0101DF' }}
                                onPress={() => this.onGoogleSignIn().then(() => {
                                    this.setState({
                                        isSigningIn: false
                                    })
                                    console.log('####', this.state.isSigningIn)
                                    console.log('Signed in with Google!')
                                })}
                            >
                                <Ionicons name='logo-google' size={24} color={'#FFF'} />
                            </TouchableOpacity> */}
                            {/*<View style={{ flex: 4 }}>*/}
                            {/*    <TouchableOpacity*/}
                            {/*        style={{ flex: 1, }}*/}

                            {/*        onPress={() => this.signOut()}*/}
                            {/*    >*/}
                            {/*        <Text>Dang xuat</Text>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</View>*/}
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback >
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
