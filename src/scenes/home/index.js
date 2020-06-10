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
        console.log('## pet id', pet);
        this.props.navigation.navigate('Details', { pet: pet })
    }

    render() {
        const { listPet } = this.props;

        console.log('###', listPet)

        const listSale = listPet ? listPet.filter(pet => pet.promotion > 0) || [] : [];

        const listDog = listPet ? listPet.filter(pet => pet.category_id === keyDog) || [] : [];

        // const listPetRender = this.state.pressedIndex ? listPet.filter(pet => pet.type_animal == this.state.pressedIndex) : listPet;

        // console.log('####', listPetRender);
        return (
            <View style={{ flex: 1 }}>
                <HeaderBar />
                <KeyboardAwareScrollView
                    innerRef={ref => {
                        this.scroll = ref;
                    }}
                    enableResetScrollToCoords={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View>
                        <View style={{ height: dims.screenHeight / 6, paddingVertical: 10 }}>
                            {/* <SwipeItems /> */}
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
                        // pressedIndex={0}
                        // listPet={}
                        />
                        <HeaderCategory
                            style={{ paddingHorizontal: 14 }}
                            leftTitle='Mèo cảnh'
                        />
                        <CategoryProduct
                            style={{ paddingHorizontal: 14 }}
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
