import type { Banner } from './types';
import { BannerLog } from './utils/BannerLog';
export declare const fetchWlBanners: (campaignId: string, bannerLog: BannerLog, keywords: string | null) => Promise<Array<Banner> | null>;
export declare const submitError: (campaignId: string, bannerLog: BannerLog, level: string, message: string) => Promise<any>;
