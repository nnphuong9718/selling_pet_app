import { Dimensions, Platform } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

const rem = 16;

export const isIPhoneX = Platform.OS === 'ios' && !Platform.isPad && (screenHeight > 800 || screenWidth > 800);

export const Fonts = {
    size: {
        tiny: rem - 5,
        smaller: rem - 4,
        small: rem - 2,
        medium: rem,
        large: rem + 2,
        larger: rem + 4
    },
    face: {}
};

export const dims = {
    screenWidth,
    screenHeight,
    Fonts
}