import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Webview } from './Webview';
import { fetchWlBanners, submitError } from './api';
import { BannerLog } from './utils/BannerLog';
// @ts-ignore
export const Blender = ({ device, appName, bannerType, campaignId, webViewProps = {}, isBannerShown, showLoadingIndicator = false, isLoggingEnabled = false, inlineBannerStyle, keywords = null, }) => {
    if (!campaignId || !campaignId.length || !isBannerShown)
        return null;
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const bannerLog = new BannerLog(isLoggingEnabled);
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                bannerLog.log('Fetching banners ...');
                setLoading(true);
                setBanners(null);
                // loop over the keywords and encode it
                const banners = await fetchWlBanners(device, appName, campaignId, bannerLog, keywords);
                bannerLog.log(JSON.stringify({ banners }));
                setBanners(banners);
                setLoading(false);
            }
            catch (error) {
                setLoading(false);
                bannerLog.error(error === null || error === void 0 ? void 0 : error.message);
                let message = '';
                if (typeof error === 'object' && error !== null && 'message' in error) {
                    message = error.message;
                }
                try {
                    await submitError(campaignId, bannerLog, 'error', message);
                }
                catch (error) {
                    return null;
                }
            }
        };
        fetchBanners();
    }, [campaignId]);
    if (loading && showLoadingIndicator)
        return React.createElement(ActivityIndicator, { size: "small", color: "#222831" });
    if (!banners || banners.length === 0)
        return null;
    const bannerToShow = banners.find(b => (b === null || b === void 0 ? void 0 : b.active) &&
        (bannerType === 'inline' ? b === null || b === void 0 ? void 0 : b.showInContainer : !(b === null || b === void 0 ? void 0 : b.showInContainer)));
    bannerLog.log(JSON.stringify({ bannerToShow }));
    if (!bannerToShow) {
        bannerLog.log(`No ${bannerType} banner with the hash ${campaignId} exists`);
        return null;
    }
    try {
        return (React.createElement(Webview, { banner: bannerToShow, bannerType: bannerType, inlineBannerStyle: inlineBannerStyle, webViewProps: webViewProps, campaignId: campaignId, bannerLog: bannerLog }));
    }
    catch (error) {
        bannerLog.error(error === null || error === void 0 ? void 0 : error.message);
        let message = '';
        if (typeof error === 'object' && error !== null && 'message' in error) {
            message = error.message;
        }
        try {
            submitError(campaignId, bannerLog, 'error', message);
        }
        catch (error) {
            return null;
        }
        return null;
    }
};
//# sourceMappingURL=Blender.js.map