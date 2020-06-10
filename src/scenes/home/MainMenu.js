import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { ButtonCus, PaddingView } from '../../components'
import { dims, responsiveFont } from '../../constants'

export default class CategoryProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedIndex: 0,

        }
    }
    onChangeIndex = (index) => {
        this.setState({
            pressedIndex: index
        })
        this.props.getIndexPressed(index);
    }
    renderListPetTitle = (pet) => {
        const { item } = pet;
        const isSelected = pet.index === this.state.pressedIndex ? true : false;
        return (
            <TouchableOpacity
                style={[styles.buttons, { backgroundColor: isSelected ? '#000' : '#FFF' }]}
                onPress={() => this.onChangeIndex(pet.index)}
            >
                <Text style={{ color: isSelected ? '#FFF' : '#A4A4A4', paddingVertical: 8, paddingHorizontal: 14, fontSize: responsiveFont(dims.Fonts.size.small) }}>{item.title}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const data = [{ id: 1, title: 'Tất cả' }, { id: 2, title: 'Mèo cảnh' }, { id: 3, title: 'Chó' }, { id: 4, title: 'Chim' }, { id: 5, title: 'Chuột hamster' }];
        return (
            <View>
                <FlatList
                    horizontal={true}
                    keyExtractor={item => `${item.id}`}
                    data={data}
                    renderItem={(item) =>
                        <View style={{ justifyContent: 'space-around' }}>
                            {this.renderListPetTitle(item)}
                        </View>

                    }
                    showsHorizontalScrollIndicator={false}
                >

                </FlatList>
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
        marginLeft: 14,
        borderColor: '#A4A4A4',
        borderWidth: 0.5,
        borderRadius: 8,
    }
})
