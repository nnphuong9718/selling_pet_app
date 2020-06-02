import React, { Component, Fragment } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Container, PaddingView } from '../../components'
import HeaderBar from './HeaderBar';
import SwipeItems from './SwipeItems'
import MainMenu from './MainMenu'
import CategoryProduct from './CategoryProduct';
import HeaderCategory from './HeaderCategory';
import { screenWidth, screenHeight, dims } from '../../constants/dims'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { images } from '../../assets';
import { responsiveFont } from '../../constants';

import { connect } from 'react-redux'
import { selectors, actions } from './services'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedIndex: 0,
        }
    }

    componentDidMount() {
        this.props.getListPet();
        const { listPet } = this.props;
        console.log('####', listPet);
    }
    _getIndexPress = (index) => {
        this.setState({
            pressedIndex: index
        })
    }
    render() {
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
                    <PaddingView>
                        <View style={{ height: dims.screenHeight / 6, paddingVertical: 10 }}>
                            <SwipeItems />
                        </View>
                        <HeaderCategory
                            leftTitle='Flash sale'
                        />
                        <MainMenu
                            getIndexPressed={index => this._getIndexPress(index)}
                        />
                        <CategoryProduct
                            pressedIndex={this.state.pressedIndex}
                        />
                        <HeaderCategory
                            leftTitle='Chó'
                        />
                        <CategoryProduct
                            pressedIndex={0}
                        />
                        <HeaderCategory
                            leftTitle='Mèo cảnh'
                        />
                        <CategoryProduct
                            pressedIndex={0}
                        />
                    </PaddingView>
                </KeyboardAwareScrollView >
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
