import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { styles } from './styles'



type Props = {
    style: Object,
    title: String,
    description: String,
    image: Object,
    titleStyle: Object,
    descriptionStyle: Object,
    imageStyle: Object,
    onPress: Function,
}

export default class Swipe extends Component<Props> {

    static defaultProps = {
        style: {},
        title: '',
        description: '',
        image: {},
        titleStyle: {},
        descriptionStyle: {},
        imageStyle: {},
        onPress: () => { },
    }

    renderItem = () => {

    }


    render() {
        const { style, title, description, image, titleStyle, descriptionStyle, imageStyle, onPress } = this.props;
        return (

            <TouchableOpacity onPress={onPress}>
                <View style={[{}, style]}>
                    <Text>
                        {title}
                    </Text>
                    <View style={styles.containerDescription}>
                        <Text>
                            {description}
                        </Text>
                        {/* <Image source={image} style={imageStyle} /> */}
                    </View>
                </View>
            </TouchableOpacity >


        )
    }
}
