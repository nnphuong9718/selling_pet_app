// import React, { Component } from 'react'
// import { View, Text, TouchableOpacity } from 'react-native'
// import { HeaderBar, ListItem } from '../../components'
// import InforBar from '../InforBar'
// import { images, icons } from '../../assets';
// // import SocialConnect from './SocialConnect'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


// export default class Personal extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//     shareToSocialMedia = () => {
//         console.log('#### ok')
//     }
//     render() {
//         return (
//             <View style={{ flex: 1, backgroundColor: '#D8D8D8' }}>
//                 <KeyboardAwareScrollView
//                     innerRef={ref => {
//                         this.scroll = ref;
//                     }}
//                     enableResetScrollToCoords={false}
//                     showsVerticalScrollIndicator={false}
//                     keyboardShouldPersistTaps="handled"
//                 >

//                     <HeaderBar title='Cá nhân' />
//                     <TouchableOpacity>
//                         <InforBar />
//                     </TouchableOpacity>
//                     <ListItem
//                         iconName={'ios-share-alt'}
//                         iconSize={24}
//                         title='Kết nối mạng xã hội'
//                         onPress={this.shareToSocialMedia}
//                         onList={false}
//                     />


//                     <ListItem
//                         iconName={'ios-document'}
//                         iconSize={24}
//                         title='Quản lý đơn hàng'
//                         onPress={this.shareToSocialMedia}
//                     />
//                     <ListItem
//                         imageName={icons.iconPet}
//                         imageStyle={{ width: 24, height: 24 }}
//                         title='Thú cưng đã mua'
//                         onPress={this.shareToSocialMedia}
//                     />
//                     <ListItem
//                         iconName={'ios-heart'}
//                         iconSize={24}
//                         title='Thú cưng yêu thích'
//                         onPress={this.shareToSocialMedia}
//                     />
//                     <View style={{ marginVertical: 10 }}>
//                         <ListItem
//                             iconName={'ios-locate'}
//                             iconSize={24}
//                             title='Sổ địa chỉ'
//                             onPress={this.shareToSocialMedia}
//                         />
//                         <ListItem
//                             iconName={'ios-card'}
//                             iconSize={24}
//                             title='Thông tin thanh toán'
//                             onPress={this.shareToSocialMedia}
//                         />
//                     </View>
//                     <ListItem
//                         iconName={'ios-log-out'}
//                         iconSize={24}
//                         title={'Đăng xuất'}
//                     />

//                 </KeyboardAwareScrollView >
//             </View>
//         )
//     }
// }
