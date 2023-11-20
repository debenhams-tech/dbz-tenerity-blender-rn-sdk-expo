import React, { useState } from 'react';
import { View, Text, Platform, StatusBar, TouchableOpacity, StyleSheet, ActivityIndicator, } from 'react-native';
import WebView from 'react-native-webview';
const HEADER_HEIGHT = 56; // default header height
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const AppBroswer = ({ url, closeAppBrowser }) => {
    const [loading, setLoading] = useState(true);
    const handleLoadStart = () => setLoading(true);
    const handleLoadEnd = () => setLoading(false);
    return (React.createElement(View, { style: styles.browserContainer },
        React.createElement(View, { style: styles.headerContainer },
            React.createElement(TouchableOpacity, { onPress: closeAppBrowser },
                React.createElement(Text, { style: styles.closeButton }, "\u2716"))),
        loading && (React.createElement(View, { style: styles.loadingContainer },
            React.createElement(ActivityIndicator, { size: "large", color: "#222831" }))),
        React.createElement(WebView, { source: { uri: url }, style: styles.broswerWebView, onLoadStart: handleLoadStart, onLoadEnd: handleLoadEnd })));
};
const styles = StyleSheet.create({
    browserContainer: {
        flex: 1,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: STATUS_BAR_HEIGHT,
            },
            android: {
                top: 0,
            },
        }),
    },
    headerContainer: {
        height: HEADER_HEIGHT,
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingBottom: 5,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        zIndex: 1000000,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                justifyContent: 'flex-end',
            },
            android: {
                justifyContent: 'center',
            },
        }),
    },
    loadingContainer: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 100000,
    },
    broswerWebView: {
        flex: 1,
        marginTop: HEADER_HEIGHT,
    },
    closeButton: {
        color: 'black',
        fontSize: 20,
    },
});
//# sourceMappingURL=AppBroswer.js.map