import React, { Component } from 'react'
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native'
import { Colors, responsiveFont, dims } from '../../constants';
import { Divider } from '../Divider'

type Props = {
    title: String,
    message: String,
    numberOfButtons: Number,
    titleSubmit: String,
    titleCancel: String,
    onSubmit: Function,
    onCancel: Function,
    modalVisible: Boolean,
    moreImportant: Number,
}

class Popup extends Component<Props> {

    static defaultProps = {
        title: '',
        message: '',
        numberOfButtons: 2,
        titleSubmit: 'Đồng ý',
        titleCancel: 'Huỷ bỏ',
        onSubmit: () => { },
        onCancel: () => { },
        modalVisible: false,
        moreImportant: 0,
    }
    render() {
        const { title, message, numberOfButtons, titleSubmit, titleCancel, onSubmit, onCancel, modalVisible, moreImportant } = this.props;
        return (
            <Modal
                animated='fade'
                visible={modalVisible}
                transparent={true}
            >
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 20 }}
                    onPress={onCancel}
                >
                    <View style={{ flex: 0.2, backgroundColor: Colors.white }}>
                        <View style={{ flex: 3, alignItems: 'center' }}>
                            <Text style={styles.titleStyle}>{title}</Text>
                            <Text style={styles.messageStyle}>{message}</Text>

                        </View>
                        {numberOfButtons === 2 ? <Divider style={{ marginBottom: 16 }} /> : null}
                        {numberOfButtons === 2 ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, paddingBottom: 16 }}>
                                {/* <View style={{ flex: 1, alignItems: 'center' }}> */}
                                <TouchableOpacity
                                    style={{ alignItems: 'center', backgroundColor: moreImportant === 0 ? Colors.blue : null, borderWidth: 0.75, borderRadius: 8, borderColor: moreImportant === 0 ? Colors.blue : Colors.grayText, justifyContent: 'center' }}
                                    onPress={onCancel}>
                                    <Text style={[styles.commonTextStyle, { color: moreImportant === 0 ? Colors.white : Colors.black }]}>
                                        {titleCancel}
                                    </Text>
                                </TouchableOpacity>
                                {/* </View> */}
                                {/* <View style={{ flex: 1, alignItems: 'center' }}> */}
                                <TouchableOpacity
                                    style={{ alignItems: 'center', backgroundColor: moreImportant === 1 ? Colors.blue : null, borderWidth: 0.75, borderRadius: 8, borderColor: moreImportant === 1 ? Colors.blue : Colors.grayText, justifyContent: 'center' }}
                                    onPress={onSubmit}>
                                    <Text style={[styles.commonTextStyle, { color: moreImportant === 1 ? Colors.white : Colors.black }]}>
                                        {titleSubmit}
                                    </Text>
                                </TouchableOpacity>
                                {/* </View> */}
                            </View>

                            :
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{ alignItems: 'center', backgroundColor: Colors.blue, borderWidth: 0.75, borderRadius: 8, borderColor: Colors.blue, justifyContent: 'center' }}
                                    onPress={onSubmit}>
                                    <Text style={[styles.commonTextStyle, { color: Colors.white }]}>
                                        {titleSubmit}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        /* } */}
                    </View>
                </TouchableOpacity >
            </Modal >
        )
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: responsiveFont(dims.Fonts.size.medium),
        fontWeight: 'bold',
        paddingVertical: 16
    },
    messageStyle: {
        fontSize: responsiveFont(dims.Fonts.size.small),
        paddingBottom: 16
    },
    commonTextStyle: {
        paddingVertical: 30,
        paddingHorizontal: 40,
        fontSize: responsiveFont(dims.Fonts.size.small),
        fontWeight: '700',
    }
})

export default Popup
