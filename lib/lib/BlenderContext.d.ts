import React, { Dispatch, FC, SetStateAction } from 'react';
import { Banner } from './types';
export type BlenderContextProviderProps = {
    children: any;
};
export interface BlenderContextProps {
    appBroswerUrl: string;
    isBroswerShown: boolean;
    hideContainer: boolean;
    banner: Banner | null;
    setAppBroswerUrl: Dispatch<SetStateAction<string>>;
    setIsBroswerShown: Dispatch<SetStateAction<boolean>>;
    setHideContainer: Dispatch<SetStateAction<boolean>>;
    setBanner: Dispatch<SetStateAction<Banner>>;
}
export declare const BlenderContext: React.Context<BlenderContextProps | null>;
export declare const BlenderContextProvider: FC<BlenderContextProviderProps>;
export declare const useBlenderContext: () => BlenderContextProps | null;
