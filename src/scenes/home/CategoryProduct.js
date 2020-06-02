import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { ButtonCus, PaddingView } from '../../components'
import { dims, responsiveFont } from '../../constants'
import { images } from '../../assets';
import { numberFormat } from '../../utils/format'

export default class CategoryProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderListPet = (pet) => {

        const { id, images, promotion, price } = pet.item;
        return (
            <View>
                <View style={{ flexDirection: 'row', paddingRight: promotion ? 5 : 16, paddingVertical: 6 }}>
                    <TouchableOpacity
                        style={{ paddingVertical: 8, }}
                        onPress={() => { console.log('ok') }}
                    >
                        <View style={{ borderRadius: 8, overflow: 'hidden' }}>
                            <Image
                                source={images}
                                style={{ resizeMode: 'cover', width: dims.screenWidth / 5, height: 140 }}
                            />
                        </View>
                        <Text style={{ alignSelf: 'center', paddingTop: 8, fontWeight: 'bold' }}>{`${numberFormat(price)} đ`}</Text>
                    </TouchableOpacity>
                    {promotion ?
                        <View style={styles.badge}>
                            <Text style={styles.textBadge}>{`${promotion}%`}</Text>
                        </View>
                        : null}

                </View>

            </View>

        )

    }

    render() {
        const { pressedIndex } = this.props;

        const listPet = [
            {
                id: 1,
                images: images.pet_6,
                promotion: 35,
                type: 2,
                price: 1200000,
            },
            {
                id: 2,
                images: images.pet_7,
                promotion: 35,
                type: 2,
                price: 1200000,
            },
            {
                id: 3,
                images: images.pet_8,
                // promotion: 35,
                type: 1,
                price: 1200000,
            },
            {
                id: 4,
                images: images.pet_9,
                promotion: 40,
                type: 2,
                price: 1200000,
            },
            {
                id: 5,
                images: images.pet_10,
                promotion: 35,
                type: 2,
                price: 1200000,
            },
            {
                id: 6,
                images: images.pet_11,
                promotion: 25,
                type: 1,
                price: 1200000,
            }
        ]

        const dataRender = pressedIndex === 0 ? listPet : listPet.filter(pet => pet.type === pressedIndex)

        return (
            <React.Fragment>
                {dataRender.length > 0 ?
                    <FlatList
                        horizontal={true}
                        keyExtractor={item => `${item.id}`}
                        data={pressedIndex === 0 ? listPet : dataRender}
                        // data={listPet}
                        renderItem={(pet) => this.renderListPet(pet)}
                        showsHorizontalScrollIndicator={false}
                    >
                    </FlatList>
                    : <Text style={{ paddingVertical: 10, alignSelf: 'center' }}>Không tìm thấy sản phẩm nào!</Text>
                }
            </React.Fragment>

        )
    }
}

const styles = StyleSheet.create({
    containerListProduct: {
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    leftText: {
        fontWeight: 'bold',
        fontSize: responsiveFont(dims.Fonts.size.small)
    },
    buttonText: {
        color: '#1A9EFF',
    },
    containerProduct: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black', 
        marginRight: 10,
        borderColor: '#515558',
        borderWidth: 0.75,
        borderRadius: 8,
    },
    badge: {
        backgroundColor: '#FF0000',
        borderRadius: 5,
        height: 23,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -15
    },
    textBadge: {
        color: '#FFF',
        paddingHorizontal: 6
    }
})
