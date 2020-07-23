import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { HeaderBar, ListItem, Popup } from '../../components'
import InforBar from './InforBar'
import { images, icons } from '../../assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import * as AsyncStorage from '../../utils/asyncStorage'
import { GoogleSignin } from "@react-native-community/google-signin";
import { emitter } from '../../utils/eventEmitter';

import database from '@react-native-firebase/database';

export default class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            showPopup: false,
            uid: ''
        }
    }

    async componentDidMount() {
        // const { user } = await GoogleSignin.signIn();
        // console.log(user);
        this.fetchData()
        emitter.addListener('RELOAD_USER_INFO', (...args) => {
            console.log(...args);
            this.fetchData()
        })
    }

    fetchData = async () => {
        const { keys, getItem } = AsyncStorage
        const _userInfo = await getItem(keys.userInfo);
        const uid = await getItem(keys.uid)
        this.setState({
            userInfo: JSON.parse(_userInfo),
            uid,
        })


    }

    componentDidUpdate(prevProps) {
        if (prevProps.userInfo !== this.props.route.userInfo) {
            console.log('Change')
        }
    }

    shareToSocialMedia = () => {
        console.log('#### ok')
    };
    _goToLoginScreen = () => {
        const { userInfo } = this.state;

        this.props.navigation.navigate(!userInfo ? 'UserScreen' : 'UserInfoScreen', userInfo ? {
            userInfo,
        } : {})
    };

    showPopup = () => {
        this.setState({
            showPopup: true
        })

    }
    hidePoup = () => {
        this.setState({
            showPopup: false
        })
    }

    _logoutAccount = async () => {
        const { keys, multiRemoveItems, getItem, removeItem } = AsyncStorage
        await getItem(keys.firebase).then(async (value) => {
            if (!value) {
                await multiRemoveItems([keys.uid, keys.firebase, keys.userInfo, keys.userInforFull])
                this.setState({
                    userInfo: null,
                    showPopup: false
                })
            }
            else {
                GoogleSignin.revokeAccess();
                multiRemoveItems([keys.firebase, keys.userInfo, keys.uid],
                    this.setState({
                        userInfo: null,
                        showPopup: false
                    })
                );
            }
        })

    }
    render() {
        const { userInfo } = this.state;

        console.log('###', userInfo);

        return (
            <View style={{ flex: 1, backgroundColor: '#D8D8D8' }}>
                <KeyboardAwareScrollView
                    innerRef={ref => {
                        this.scroll = ref;
                    }}
                    enableResetScrollToCoords={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >

                    <HeaderBar title='Cá nhân' />
                    <TouchableOpacity onPress={this._goToLoginScreen}>
                        <InforBar
                            userInfo={userInfo ? userInfo : null}
                        />
                    </TouchableOpacity>
                    <ListItem
                        iconName={'ios-share-alt'}
                        iconSize={24}
                        title='Kết nối mạng xã hội'
                        onPress={this.shareToSocialMedia}
                        onList={false}
                    />
                    <ListItem
                        iconName={'ios-document'}
                        iconSize={24}
                        title='Quản lý đơn hàng'
                        onPress={this.shareToSocialMedia}
                    />
                    <ListItem
                        imageName={icons.iconPet}
                        imageStyle={{ width: 24, height: 24 }}
                        title='Thú cưng đã mua'
                        onPress={this.shareToSocialMedia}
                    />
                    <ListItem
                        iconName={'ios-heart'}
                        iconSize={24}
                        title='Thú cưng yêu thích'
                        onPress={this.shareToSocialMedia}
                    />
                    <View style={{ marginVertical: 10 }}>
                        <ListItem
                            iconName={'ios-locate'}
                            iconSize={24}
                            title='Sổ địa chỉ'
                            onPress={this.shareToSocialMedia}
                        />
                        <ListItem
                            iconName={'ios-card'}
                            iconSize={24}
                            title='Thông tin thanh toán'
                            onPress={this.shareToSocialMedia}
                        />
                    </View>
                    {
                        userInfo ?


                            <ListItem
                                iconName={'ios-log-out'}
                                iconSize={24}
                                title={'Đăng xuất'}
                                onPress={this.showPopup}
                            /> : null
                    }

                </KeyboardAwareScrollView >
                <Popup
                    modalVisible={this.state.showPopup}
                    title={'Đăng xuất'}
                    message={'Bạn có chắc chắn muốn đăng xuất?'}
                    numberOfButtons={2}
                    onCancel={this.hidePoup}
                    onSubmit={this._logoutAccount}
                />
            </View>
        )
    }
}
