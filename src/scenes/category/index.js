import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import HeaderBar from '../home/HeaderBar'
import HeaderCategory from '../home/HeaderCategory'
import { PaddingView } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { responsiveFont } from '../../constants';
import { dims } from '../../constants/dims'


export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showListPet: true,
        }
    }
    renderListPet = (item) => {
        console.log('####', item);
        return (
            <View style={{ paddingVertical: 10 }}>
                <TouchableOpacity onPresss={() => { this.handleIndex() }}>
                    <Text style={styles.textButton}>{`Cho ${item.item}`}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    onPressedShow = () => {
        this.setState({
            showListPet: !this.state.showListPet
        })
    }
    render() {
        const { showListPet } = this.state;
        return (
            <React.Fragment>
                <HeaderBar />
                <PaddingView>
                    <View style={{ backgroundColor: "#FFF", borderRadius: 8, marginVertical: 10 }}>
                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.textButton}>Chó</Text>
                            <TouchableOpacity onPress={this.onPressedShow}>
                                {this.state.showListPet ?
                                    <Ionicons name="ios-arrow-dropup" color="#999999" size={23} />
                                    : <Ionicons name="ios-arrow-dropdown" color="#999999" size={23} />
                                }
                            </TouchableOpacity>
                        </View>

                    </View>
                    {showListPet ?
                        <View style={{ backgroundColor: "#FFF", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 8 }}>
                            <FlatList
                                data={['1', '2', '3']}
                                renderItem={(item) => this.renderListPet(item)}
                            >

                            </FlatList>
                        </View>
                        : null
                    }
                </PaddingView>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    textButton: {
        color: '#9C9C9C',
        fontWeight: 'bold',
        fontSize: responsiveFont(dims.Fonts.size.small)
    }
})
