import { FC } from 'react';
import { StyleSheetProperties } from 'react-native';
import { WebViewProps } from 'react-native-webview';
export type onUserInteractParams = {
    eventName: string;
    targetedUrl: string | null;
};
export type BlenderProps = {
    bannerType: 'inline' | 'fullscreen';
    campaignId: string;
    isBannerShown: boolean;
    webViewProps?: Omit<WebViewProps, 'source'> | undefined;
    showLoadingIndicator?: boolean | undefined;
    isLoggingEnabled?: boolean | undefined;
    inlineBannerStyle?: StyleSheetProperties | any;
    keywords?: string | null | undefined;
};
export declare const Blender: FC<BlenderProps>;
