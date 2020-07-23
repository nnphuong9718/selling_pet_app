import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import HeaderBar from './HeaderBar';
import SwipeItems from './SwipeItems'
import MainMenu from './MainMenu'
import CategoryProduct from './CategoryProduct';
import HeaderCategory from './HeaderCategory';
import { dims } from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'
import { selectors, actions } from './services'
import { emitter } from '../../utils/eventEmitter'

import database from '@react-native-firebase/database';

import * as AsyncStorage from '../../utils/asyncStorage';


const keyCat = 1;
const keyDog = 2;
const keyBird = 3;
const keyMouse = 4;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedIndex: 0,
            userInfor: {}
        }
    }

    async componentDidMount() {
        this.props.getListPet();
        emitter.emit('RELOAD_CART', 10);

        const { keys, getItem, setItem } = AsyncStorage;

        await getItem(keys.uid).then((value) => {
            if (!value) {
                return;
            } else {
                database().ref('/users').on('value', snapshot => {
                    console.log('###', value)
                    this.setState({
                        userInfor: snapshot._snapshot.value[value],
                    })
                })
            }
        })

    }

    _getIndexPress = (index) => {
        this.setState({
            pressedIndex: index
        })
    }

    _goToDetailScreen = (pet) => {
        const { userInfor } = this.state;
        this.props.navigation.navigate('Details', {
            pet: pet,
            userInfor: userInfor
        })
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
        const listBird = listPet ? listPet.filter(pet => pet.category_id === keyBird && !pet.promotion) || [] : [];
        const listMouse = listPet ? listPet.filter(pet => pet.category_id === keyMouse && !pet.promotion) || [] : [];


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

                        <HeaderCategory
                            style={{ paddingHorizontal: 14 }}
                            leftTitle='Chim'
                        />
                        <CategoryProduct
                            style={{ paddingHorizontal: 14 }}
                            listPet={listBird || []}
                            goToDetailScreen={id => this._goToDetailScreen(id)}
                        // pressedIndex={0}
                        />
                        <HeaderCategory
                            style={{ paddingHorizontal: 14 }}
                            leftTitle='Chuột'
                        />
                        <CategoryProduct
                            style={{ paddingHorizontal: 14 }}
                            listPet={listMouse || []}
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
