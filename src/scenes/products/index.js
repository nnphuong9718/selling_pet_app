import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { HeaderBarDetail, ListItem } from '../../components'
import InforBar from './InforBar'
import { images, icons } from '../../assets';
// import SocialConnect from './SocialConnect'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        const { pet_id } = this.props.route.params;
        console.log('###', pet_id)
    }
    render() {
        return (
            <HeaderBarDetail />
        )
    }
}
