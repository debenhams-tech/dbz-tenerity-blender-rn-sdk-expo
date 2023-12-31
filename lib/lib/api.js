var _a;
import axios from 'axios';
import { Platform, Dimensions } from 'react-native';
import { getManufacturer, getApplicationName } from 'react-native-device-info';
const api = axios.create({
    baseURL: 'https://mobile.wlscripts.com',
});
const params = {
    type: Platform.OS === 'ios' ? 'iOS' : 'Android',
    os: (_a = String(Platform.Version)) === null || _a === void 0 ? void 0 : _a.replace(/\./g, '-'),
    device: getManufacturer(),
    appName: getApplicationName(),
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};
export const fetchWlBanners = async (campaignId, bannerLog, keywords) => {
    const { type, os, device, appName, width, height } = params;
    const timestamp = Date.now().valueOf();
    const resolution = `${width}x${height}`;
    const orientation = width > height ? 'landscape' : 'portrait';
    try {
        let encodedKeywords = keywords ? encodeURIComponent(keywords) : '';
        const response = await api.get(`/PORTIER_mdp/${campaignId}/${timestamp}/type=${type};os=${os};device=${device};app=${appName};lang=en;screen=${resolution};orientation=${orientation}/${encodedKeywords}`);
        return response.data.banners;
    }
    catch (error) {
        bannerLog.error(JSON.stringify(error));
        throw error;
    }
};
export const submitError = async (campaignId, bannerLog, level, message) => {
    try {
        const { type, os, device, appName, width, height } = params;
        const timestamp = Date.now().valueOf();
        const resolution = `${width}x${height}`;
        const orientation = width > height ? 'landscape' : 'portrait';
        const response = await api.post(`/EDGE_LOOP/${campaignId}`, {
            level: level,
            message: message,
            data: {
                type,
                os,
                device,
                appName,
                width,
                height,
                timestamp,
                resolution,
                orientation,
            },
        });
        return response;
    }
    catch (error) {
        bannerLog.error(JSON.stringify(error));
        return null;
    }
};
//# sourceMappingURL=api.js.map