import React, { createContext, useContext, useState, } from 'react';
import { AppBroswer } from './AppBroswer';
export const BlenderContext = createContext({
    appBroswerUrl: '',
    isBroswerShown: false,
    hideContainer: false,
    banner: null,
    setAppBroswerUrl: () => '',
    setIsBroswerShown: () => false,
    setHideContainer: () => false,
    setBanner: () => { },
});
export const BlenderContextProvider = ({ children, }) => {
    const [appBroswerUrl, setAppBroswerUrl] = useState('');
    const [isBroswerShown, setIsBroswerShown] = useState(false);
    const [hideContainer, setHideContainer] = useState(false);
    const [banner, setBanner] = useState(null);
    const value = {
        appBroswerUrl,
        isBroswerShown,
        hideContainer,
        banner,
        setAppBroswerUrl,
        setIsBroswerShown,
        setHideContainer,
        setBanner,
    };
    return (React.createElement(BlenderContext.Provider, { value: value },
        children,
        isBroswerShown && (React.createElement(AppBroswer, { url: appBroswerUrl, closeAppBrowser: () => {
                if (!(banner === null || banner === void 0 ? void 0 : banner.showInContainer))
                    setHideContainer(true);
                setAppBroswerUrl('');
                setIsBroswerShown(false);
            } }))));
};
export const useBlenderContext = () => useContext(BlenderContext);
//# sourceMappingURL=BlenderContext.js.map