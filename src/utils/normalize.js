import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const normalize = size => {
    if (deviceWidth > 375) {
        return size + 2;
    }

    if (deviceWidth > 360 && deviceWidth <= 375) {
        return size + 1;
    }

    if (deviceWidth > 340) {
        return size;
    }

    return size - 2;
};

module.exports = normalize;