import { FC } from 'react';
import { WebViewProps } from 'react-native-webview';
import { StyleSheetProperties } from 'react-native';
import { Banner } from './types';
import { BannerLog } from './utils/BannerLog';
export type AppWebviewProps = {
    banner: Banner;
    webViewProps: Omit<WebViewProps, 'source'>;
    bannerType: string;
    inlineBannerStyle?: StyleSheetProperties | any;
    campaignId: string;
    bannerLog: BannerLog;
};
export declare const AppWebview: FC<AppWebviewProps>;
export { AppWebview as Webview };
