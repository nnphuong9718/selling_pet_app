import React from 'react';
import { View } from 'react-native';
import styles from './styles';

export const Divider = ({ style, children }) => {
    return <View style={[styles.divider, style]}>{children}</View>;
};