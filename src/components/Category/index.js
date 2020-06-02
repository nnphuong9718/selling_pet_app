import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type Items = {
    image: String,
    name: String,
    price: String,
}

type Props = {
    renderItems: Array<Items>,
}


export default class Category extends Component<Props> {

    renderList = () => {

    }
    render() {
        const { renderItems } = this.props;
        return (
            
        )
    }
}
