import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { dims, responsiveFont } from '../../constants'
import { images } from '../../assets';
import { numberFormat } from '../../utils/format'

export default class CategoryProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    _goToDetailScreen = (pet) => {
        this.props.goToDetailScreen(pet);
    }

    renderListPet = (pet) => {
        const { inListPromotion } = this.props;
        const { pet_id, images, promotion, price } = pet.item;
        return (
            <View>
                <View style={{ flexDirection: 'row', paddingRight: promotion ? 5 : 20, paddingVertical: 6 }}>
                    <TouchableOpacity
                        style={{ paddingVertical: 8, }}
                        onPress={() => this._goToDetailScreen(pet.item)}
                    >
                        <View style={{ borderRadius: 8, overflow: 'hidden' }}>
                            <Image
                                source={{ uri: images }}
                                style={{ resizeMode: 'contain', width: dims.screenWidth / 5, height: 120, }}
                            />
                        </View>
                        <Text style={{ alignSelf: 'center', paddingTop: 8, fontWeight: 'bold' }}>{`${numberFormat(price)} đ`}</Text>
                    </TouchableOpacity>
                    {promotion && inListPromotion ?
                        <View style={styles.badge}>
                            <Text style={styles.textBadge}>{`${promotion}%`}</Text>
                        </View>
                        : null}
                </View>
            </View>
        )
    };

    render() {
        const { pressedIndex, style } = this.props;

        const { listPet } = this.props || [];

        // const dataRender = pressedIndex === 0 ? listPet : listPet.filter(pet => pet.type === pressedIndex)

        return (
            <View style={style}>
                {listPet && listPet.length > 0 ?
                    <FlatList
                        horizontal={true}
                        keyExtractor={item => `${item.pet_id}`}
                        // data={pressedIndex === 0 ? listPet : dataRender}
                        data={listPet || []}
                        renderItem={(pet) => this.renderListPet(pet)}
                        showsHorizontalScrollIndicator={false}
                    >
                    </FlatList>
                    : <Text style={{ paddingVertical: 10, alignSelf: 'center' }}>Không tìm thấy sản phẩm nào!</Text>
                }
            </View>

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
