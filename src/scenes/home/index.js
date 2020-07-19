import React, { Component, Fragment } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import HeaderBar from './HeaderBar';
import SwipeItems from './SwipeItems'
import MainMenu from './MainMenu'
import CategoryProduct from './CategoryProduct';
import HeaderCategory from './HeaderCategory';
import { screenWidth, screenHeight, dims } from '../../constants/dims'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'
import { selectors, actions } from './services'


const keyCat = 1;
const keyDog = 2;
const keyBird = 3;
const keyMouse = 4;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedIndex: 0,
        }
    }

    componentDidMount() {
        this.props.getListPet();
    }

    _getIndexPress = (index) => {
        this.setState({
            pressedIndex: index
        })
    }

    _getListPetRender = (listPet) => {

    }

    _goToDetailScreen = (pet) => {
        this.props.navigation.navigate('Details', { pet: pet })
    }

    onOpenCart = () => {
        this.props.navigation.navigate('Cart', {});
    }

    goToSearchScreen = () => {
        console.log('aaaa')
        this.props.navigation.navigate('Tìm kiếm', {});
    }

    render() {
        const { listPet } = this.props;
        const listSale = listPet ? listPet.filter(pet => pet.promotion > 0) || [] : [];
        const listDog = listPet ? listPet.filter(pet => pet.category_id === keyDog && !pet.promotion) || [] : [];
        const listCat = listPet ? listPet.filter(pet => pet.category_id === keyCat && !pet.promotion) || [] : [];


        return (
            <View style={{ flex: 1 }}>
                <HeaderBar
                    onPressCart={this.onOpenCart}
                    onPressSearchBar={this.goToSearchScreen}
                />
                <KeyboardAwareScrollView
                    innerRef={ref => {
                        this.scroll = ref;
                    }}
                    enableResetScrollToCoords={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View>
                        <View style={{ height: dims.screenHeight / 6, paddingVertical: 10, marginHorizontal: 20 }}>
                            <SwipeItems />
                        </View>
                        <HeaderCategory
                            style={{ paddingHorizontal: 14 }}
                            leftTitle='Flash sale'
                        />
                        <MainMenu
                            getIndexPressed={index => this._getIndexPress(index)}
                        />
                        <CategoryProduct
                            style={{ paddingHorizontal: 14 }}
                            listPet={listSale || []}
                            pressedIndex={this.state.pressedIndex}
                            inListPromotion={true}
                            goToDetailScreen={id => this._goToDetailScreen(id)}
                        />
                        <HeaderCategory
                            style={{ paddingHorizontal: 14 }}
                            leftTitle='Chó'
                        />
                        <CategoryProduct
                            style={{ paddingHorizontal: 14 }}
                            listPet={listDog || []}
                            goToDetailScreen={id => this._goToDetailScreen(id)}
                        // pressedIndex={0}
                        // listPet={}
                        />
                        <HeaderCategory
                            style={{ paddingHorizontal: 14 }}
                            leftTitle='Mèo cảnh'
                        />
                        <CategoryProduct
                            style={{ paddingHorizontal: 14 }}
                            listPet={listCat || []}
                            goToDetailScreen={id => this._goToDetailScreen(id)}
                        // pressedIndex={0}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerListProduct: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },

})

const mapStateToProps = (state) => ({
    listPet: selectors.getListPet(state),
})

const mapDispatchToProps = (dispatch) => ({
    getListPet: () => dispatch(actions.getListPet())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
