import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SearchHeader } from '../../components'
import { Colors } from '../../constants';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons'

import * as AsyncStorage from '../../utils/asyncStorage'
import { connect } from 'react-redux';
import { selectors, actions } from '../payments/services'


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
        const data = await getItem(keys.historySearch,
            this.setState({
                searchHistory: data,
            })
        )
        console.log('###', searchHistory);
    }

    onChangeText = (text) => {
        this.setState({
            petName: text,
        })
    }

    backToHome = () => {
        this.props.navigation.navigate('Trang chủ',);
    }
    renderHistory = (item) => {
        // const { searchHistory } = this.state;

        console.log('##', item.item);
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text>

                </Text>

            </View>
        )
    }

    onSearch = () => {
        const { petName } = this.state;
        if (!petName) {
            return;
        }
        else {
            this.props.navigation.navigate('SearchResult', {
                keyword: petName
            })
        }


    }
    render() {
        const { searchHistory } = this.state;
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container} >
                    <View style={{ flex: 1, paddingHorizontal: 20, borderBottomColor: Colors.grayText, borderBottomWidth: 0.5 }}>
                        <SearchHeader
                            placeholder={'Thú cưng bạn cần...'}
                            onChangeText={(text) => this.onChangeText(text)}
                            style={{ paddingHorizontal: 25 }}
                            placeholderTextColor={Colors.grayText2}
                            onPress={this.backToHome}
                            onSubmit={this.onSearch}
                        />
                    </View>
                    <View style={{ flex: 2.5, backgroundColor: 'yellow' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Ionicons name={'ios-flame'} size={24} color={Colors.red} />
                            </View>
                            <View style={{ flex: 8 }}>
                                <Text>Từ khóa Hot</Text>
                            </View>
                        </View>
                        <View style={{ flex: 3, paddingHorizontal: 20 }}>
                            <Text>Loading...</Text>
                        </View>
                    </View>
                    <View style={{ flex: 7 }}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between' }}>
                            <Text>
                                Lịch sử tìm kiếm
                            </Text>
                            <TouchableOpacity>
                                <Text style={{ color: Colors.blue }}>Xoá</Text>

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
})

const mapStateToProps = (state) => ({
    userAddress: selectors.getUserAddress(state),
})

const mapDispatchToProps = (dispatch) => ({
    getUserAddress: dispatch(actions.getUserAddress()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
