import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Keyboard, Image } from 'react-native';
import { SearchHeader, PaddingView } from '../../components'
import { Colors, responsiveFont, dims } from '../../constants';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons'

import * as AsyncStorage from '../../utils/asyncStorage'
import { connect } from 'react-redux';
import { selectors, actions } from '../payments/services'

import { icons } from '../../assets';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            petName: '',
            searchHistory: []
        }
    }

    componentDidMount = async () => {
        const { keys, getItem } = AsyncStorage;
        await getItem(keys.historySearch).then(data => {
            // this.setState({
            //     searchHistory: data
            // })
            console.log('###', JSON.parse(data));
            let _data = JSON.parse(data);
            this.setState({
                searchHistory: _data
            })
        })
        // console.log('##', data)
    }

    onChangeText = (text) => {
        this.setState({
            petName: text,
        })
    }

    backToHome = () => {
        this.props.navigation.navigate('Trang chủ',);
    }
    onCopyResult = (petName) => {
        this.setState({
            petName
        })
        this.refs.searchBar.input.focus();
    }
    renderHistory = (item) => {
        // const { searchHistory } = this.state;

        // console.log('##', item.item);
        const { petName } = item.item;
        return (
            <PaddingView style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                <Text style={styles.textStyle}>
                    {petName}
                </Text>
                <TouchableOpacity
                    onPress={() => this.onCopyResult(petName)}
                >
                    <Image source={icons.copyResult} resizeMode='contain' style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            </PaddingView>
        )
    }

    goToSearchResultScreen = (keyword) => {
        this.props.navigation.navigate('SearchResult', {
            keyword: keyword
        })
    }

    onRemoveHistory = async () => {
        const { keys, removeItem } = AsyncStorage;
        await removeItem(keys.historySearch);
    }

    onSearch = async () => {
        const { keys, setItem, getItem } = AsyncStorage;
        const { petName } = this.state;
        if (!petName) {
            return;
        }
        else {
            await getItem(keys.historySearch)
                .then((value) => {
                    if (!value) {
                        let array = [];
                        array.push({ petName });
                        setItem(keys.historySearch, JSON.stringify(array),
                            this.goToSearchResultScreen(petName)
                        );
                    }
                    else {
                        let _data = JSON.parse(value);
                        _data.push({ petName });
                        setItem(keys.historySearch, JSON.stringify(_data),
                            this.goToSearchResultScreen(petName));
                    }
                })
        }
    }
    render() {
        const { searchHistory } = this.state;
        console.log('E##', searchHistory)
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container} >
                    <View style={{ flex: 1, paddingHorizontal: 20, borderBottomColor: Colors.grayText, borderBottomWidth: 0.5 }}>
                        <SearchHeader
                            ref={"searchBar"}
                            placeholder={'Thú cưng bạn cần...'}
                            onChangeText={(text) => this.onChangeText(text)}
                            style={{ paddingHorizontal: 25 }}
                            placeholderTextColor={Colors.grayText2}
                            onPress={this.backToHome}
                            onSubmit={this.onSearch}
                            autoFocus={true}
                            value={this.state.petName}
                        />
                    </View>
                    {/* <View style={{ flex: 2.5, paddingVertical: 16 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Ionicons name={'ios-flame'} size={24} color={Colors.red} />
                            </View>
                            <View style={{ flex: 8 }}>
                                <Text style={styles.textStyle}>Từ khóa Hot</Text>
                            </View>
                        </View>
                        <View style={{ flex: 3, paddingHorizontal: 20 }}>


                        </View>
                    </View> */}
                    <View style={{ flex: 2, paddingVertical: 16 }}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between' }}>
                            <Text style={styles.textStyle}>
                                Lịch sử tìm kiếm
                            </Text>
                            <TouchableOpacity
                                onPress={this.onRemoveHistory}
                            >
                                <Text style={[styles.textStyle, { color: Colors.blue }]}>Xoá</Text>

                            </TouchableOpacity>
                        </View>
                        <FlatList
                            keyExtractor={item => `${item.id}`}
                            data={searchHistory}
                            renderItem={item => this.renderHistory(item)}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    textStyle: {
        fontSize: responsiveFont(dims.Fonts.size.smaller),
        color: Colors.grayText2
    }
})

const mapStateToProps = (state) => ({
    userAddress: selectors.getUserAddress(state),
})

const mapDispatchToProps = (dispatch) => ({
    getUserAddress: dispatch(actions.getUserAddress()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
