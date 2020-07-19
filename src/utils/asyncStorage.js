import AsyncStorage from '@react-native-community/async-storage'

const keys = {
    firebase: 'firebase_token',
    userInfo: 'user_info_login',
    cart: 'cart',
    historySearch: 'history_search',
}

const getItem = async (keys) => {
    if (!keys) {
        return undefined;
    }
    try {
        return await AsyncStorage.getItem(keys);
    } catch (error) {
        throw error;
    }
}

const setItem = async (keys) => {
    if (!keys) {
        return undefined;
    }
    try {
        return await AsyncStorage.setItem(keys);
    } catch (error) {
        throw error;
    }
}

const removeItem = async (keys) => {
    if (!keys) {
        return undefined;
    }
    try {
        return await AsyncStorage.removeItem(keys);
    } catch (error) {
        throw error;
    }
}

export { keys, setItem, getItem, removeItem }