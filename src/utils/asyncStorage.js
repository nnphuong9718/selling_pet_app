import AsyncStorage from '@react-native-community/async-storage'

const keys = {
    firebase: 'firebase_token',
    userInfo: 'user_info_login',
    cart: 'cart',
    historySearch: 'history_search',
    uid: 'uid',
    userInforFull: 'user_infor',
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

const setItem = async (keys, jsonValue) => {
    if (!keys) {
        return undefined;
    }
    try {
        return await AsyncStorage.setItem(keys, jsonValue);
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

const multiRemoveItems = async (keys: Array<string>) => {
    const result = [];
    keys.forEach(async (key: string, index: number) => {
        result[index] = removeItem(key);
    });
    return Promise.all(result);
};

export { keys, setItem, getItem, removeItem, multiRemoveItems }