import { StyleSheet } from 'react-native'
import { Colors, dims, responsiveFont } from '../../constants/'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
        justifyContent: 'space-between'
    },
    circleBorder: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,

    },

    smallCircleBorder: {
        width: 18,
        height: 18,
        borderRadius: 18 / 2,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallCircleBorderUnSelect: {
        width: 18,
        height: 18,
        borderRadius: 18 / 2,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTopBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10
    },
    boxStyle: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    textStyle: {
        fontSize: responsiveFont(dims.Fonts.size.small),
        color: Colors.blue,
        fontWeight: '500'
    },
    containerBlockView: {
        backgroundColor: Colors.white,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    titleText: {
        fontSize: responsiveFont(dims.Fonts.size.small),
        color: Colors.black,
        fontWeight: '600'
    },
    valueText: {
        fontSize: responsiveFont(dims.Fonts.size.smaller),
        color: Colors.grayText
    },
    valueTextSelected: {
        fontSize: responsiveFont(dims.Fonts.size.smaller),
        color: Colors.blue
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center'
        // paddingHorizontal: 20
    }
});