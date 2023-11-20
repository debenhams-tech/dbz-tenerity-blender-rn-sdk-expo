import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import { StyleSheet, Linking, SafeAreaView, Platform, } from 'react-native';
import { useBlenderContext } from './BlenderContext';
export const AppWebview = ({ banner, webViewProps, bannerType, inlineBannerStyle, }) => {
    const { 
    //@ts-ignore
    hideContainer, 
    //@ts-ignore
    setHideContainer, 
    //@ts-ignore
    setAppBroswerUrl, 
    //@ts-ignore
    setBanner, 
    //@ts-ignore
    setIsBroswerShown, } = useBlenderContext();
    const [userInteracted, setUserInteracted] = useState(false);
    useEffect(() => {
        setBanner(banner);
        setHideContainer(false);
    }, [banner]);
    if (!banner)
        return null;
    if (hideContainer && bannerType === 'fullscreen')
        return null;
    const html = `
    <!DOCTYPE html>
    <html>
      <body>
        <script>${banner.html}</script>
      </body>
    </html>
  `;
    const handleShouldStartLoadWithRequest = (event) => {
        // If the user has interacted with the WebView, prevent any new pages from loading
        if (userInteracted) {
            // console.error('triggered')
            // try {
            if ((event.url.endsWith('#') ||
                event.url === 'about:blank%230' ||
                event.url.endsWith('#0')) &&
                !banner.showInContainer) {
                if (bannerType === 'fullscreen')
                    setHideContainer(true);
                // if the banner clicked open the url
            }
            else if (event.url !== 'about:blank') {
                // alert('mmm')
                if (bannerType === 'fullscreen')
                    setHideContainer(true);
                // open in the app's broswer
                if (banner.target === '_parent') {
                    if (bannerType === 'fullscreen')
                        setHideContainer(true);
                    setAppBroswerUrl(event.url);
                    setIsBroswerShown(true);
                }
                else {
                    // open in device's broswer
                    Linking.openURL(event.url);
                }
            }
            // } catch (error: any) {
            //   await submitError(campaignId, bannerLog, 'error', error?.message)
            //   return false
            // }
            return false;
        }
        // Allow all other requests to load
        return true;
    };
    const handleWebViewInteraction = () => {
        // Update the state variable to indicate that the user has interacted with the WebView
        setUserInteracted(true);
    };
    /**
     * HACK FOR ANDROID TO DIMISS THE BANNER
     * because onShouldStartLoadWithRequest doesn't trigger when banner is dismissed
     */
    const handleNavigationStateChange = (event) => {
        if (Platform.OS === 'android' &&
            event.url.includes('data:text/html;charset=utf-8;base64') &&
            !banner.showInContainer) {
            setHideContainer(true);
        }
    };
    return (React.createElement(SafeAreaView, { style: bannerType === 'fullscreen'
            ? styles.fullScreenBannerContainer
            : { ...styles.inlineBannerContainer, ...inlineBannerStyle } },
        React.createElement(WebView, { source: { html }, style: styles.webviewStyle, onShouldStartLoadWithRequest: handleShouldStartLoadWithRequest, onTouchStart: handleWebViewInteraction, onMouseDown: handleWebViewInteraction, setSupportMultipleWindows: Platform.OS === 'ios', onNavigationStateChange: handleNavigationStateChange, ...webViewProps })));
};
const styles = StyleSheet.create({
    fullScreenBannerContainer: {
        flex: 1,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    inlineBannerContainer: {
        height: 100,
        width: '100%',
    },
    webviewStyle: {
        backgroundColor: 'transparent',
        width: '100%',
    },
});
export { AppWebview as Webview };
//# sourceMappingURL=Webview.js.map