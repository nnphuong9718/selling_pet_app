import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { SearchBar } from '../../components'
import { connect } from 'react-redux'
import { selectors, actions } from '../home/services'
import { selectors as paymentSelectors, actions as paymentActions } from '../payments/services'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../constants'
import { icons } from '../../assets'

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData = () => {
        this.props.getListPet();
        this.props.getUserAddress();
    }

    onFilterData = (array, keyword) => {
        return array.filter(item => item.pet_name.includes(keyword.toLowerCase()));
    }

    _goToDetailScreen = (pet) => {
        this.props.navigation.navigate('Details', { pet: pet })
    }

    renderSearchList = (item) => {
        const { pet_id, images, promotion, pet_description, pet_name, price, category_id } = item.item;
        return (
            <View style={{ padding: 10, borderBottomColor: Colors.grayText, borderBottomWidth: 0.5, borderTopColor: item.index === 0 ? Colors.grayText : '', borderTopWidth: item.index === 0 ? 0.5 : 0 }}>
                <TouchableOpacity
                    style={{ flex: 1, flexDirection: 'row', }}
                    onPress={() => this._goToDetailScreen(item.item)}
                >
                    <View style={{ flex: 0.4 }}>
                        <Image source={{ uri: images }} style={{ resizeMode: 'contain', width: '100%', minHeight: 100 }} />
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <Text numberOfLines={2}>
                            {pet_description}
                        </Text>
                        <Text>
                            {price}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    onPressCart = () => {
        this.props.navigation.navigate('Cart', {})
    }

    render() {
        const { listPet, userAddress } = this.props;
        const { keyword } = this.props.route.params;

        const data = listPet ? this.onFilterData(listPet, keyword) : [];

        return (
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, backgroundColor: Colors.blue, alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="ios-arrow-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <View style={{ flex: 7, backgroundColor: Colors.white, borderRadius: 5 }}>
                        <SearchBar
                            placeholder={keyword}
                            style={{ paddingHorizontal: 20, paddingVertical: 10 }}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity
                            // style={{ alignItems: 'center', marginLeft: 8 }}
                            onPress={this.onPressCart}
                        >
                            <Image
                                source={icons.iconCart}
                                style={{ width: 24, height: 24 }}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Ionicons
                            name="ios-locate"
                            size={24}
                            color={Colors.blue}
                        />
                    </View>
                    <View style={{ flex: 8 }}>
                        <Text style={{ textDecorationLine: 'underline' }}>
                            {userAddress && userAddress[0] ? userAddress[0].user_address : ''}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 9 }}>
                    <FlatList
                        data={data}
                        keyExtractor={item => `${item.pet_id}`}
                        renderItem={item => this.renderSearchList(item)}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    listPet: selectors.getListPet(state),
    userAddress: paymentSelectors.getUserAddress(state),
})

const mapDispatchToProps = (dispatch) => ({
    getListPet: () => dispatch(actions.getListPet()),
    getUserAddress: () => dispatch(paymentActions.getUserAddress())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)
