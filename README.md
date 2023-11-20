# tenerity-blender-rn-sdk

> This is a `Mobile Ad Library - Blender` package provided by Webloyalty for implementation in `react-native` applications of our partners

## How to:

1. Install the package

```shell
yarn add tenerity-blender-rn-sdk
```

2. Install Pods for tenerity-blender-rn-sdk dependencies (react-native-device-info react-native-webview)

> _You can omit this step if you already have these pods installed_

```shell
npx pod-install ios
```

## Using this package in your components:

> See the example below on how to import and use this package

```typescript
import React from 'react';
import { StyleSheet, Text View } from 'react-native';
import { Blender, BlenderContextProvider } from 'tenerity-blender-rn-sdk'

const App = () => {
  const CAMPAIGN_ID = "wl campaign id"

  return (
    <BlenderContextProvider>
      <Blender
        campaignId={CAMPAIGN_ID}
        bannerType="inline"
        isBannerShown={isBannerShown}
        showLoadingIndicator={true}
        isLoggingEnabled={true}
        inlineBannerStyle={styles.bannerStyles}
      />
    <BlenderContextProvider/>
  );
};

const styles = StyleSheet.create({
  bannerStyles: {
    width: '100%',
    height: 700,
  },
});

export default App;
```

💡 **Important!** You must wrap your component with `<BlenderContextProvider />` so that the In App Browser appears correctly. Also make sure that when `bannerType` is `fullscreen`, the `<Blender>` component is placed at the bottom in the element tree.

## Props

```typescript
export type BlenderProps = {
  bannerType: 'inline' | 'fullscreen'
  campaignId: string
  webViewProps?: Omit<WebViewProps, 'source'>
  isBannerShown: boolean
  showLoadingIndicator: boolean
  isLoggingEnabled: boolean
  inlineBannerStyle: StyleSheetProperties
}
```

| prop                 | type                         | required | default value |
| :------------------- | :--------------------------- | :------- | :------------ |
| bannerType           | 'inline' \| 'fullscreen'     | yes      |               |
| campaignId           | string                       | yes      |               |
| isBannerShown        | boolean                      | yes      |               |
| showLoadingIndicator | boolean                      | no       | false         |
| isLoggingEnabled     | boolean                      | no       | false         |
| inlineBannerStyle    | StyleSheetProperties         | no       | {}            |
| webViewProps         | Omit<WebViewProps, 'source'> | no       | {}            |

<hr />
<hr />

### bannerType

<hr />

The Blender SDK works with an array of "banner objects" that are provided by the API. One of the properties of a banner object tells us of whether this specific banner is an inline banner (intended to be displayed within the contents of a screen) or a full-screen banner (intended to be displayed in a full-screen modal).

By specifying the `bannerType` prop in your component as either 'inline' of 'fullscreen' the `<Blender />` component will use the first instance of a banner object of that specified banner type and render it. Note that the specific banner object's `active` property must be set to true. Inactive banners are ignored.

Currently tenerity-blender-sdk assumes that the array of banners will only return one active banner of each type. If this is found out to be incorrect, then the implementation needs to be updated.

<hr />
<hr />

### campaignId

<hr />

This is the Campaign ID received from WL to use for retrieving the Banners relevant to a specific campaign.

<hr />
<hr />

### webViewProps

<hr />

This prop enables you to pass props to the `<Webview />` component that is imported from `react-native-webview`. See example below:

```typescript
const runFirst = `
document.body.style.backgroundColor = 'red';
setTimeout(function() { window.alert('hi') }, 2000);
true; // note: this is required, or you'll sometimes get silent failures`

;<Blender
  campaignId={CAMPAIGN_ID}
  bannerType="fullscreen"
  webViewProps={{
    onMessage: event => console.table(event),
    injectedJavaScript: runFirst,
  }}
/>
```

For a full list of available Webview props [see this page](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md)

<hr />
<hr />

### isLoggingEnabled

<hr />
Set this prop to `true` if needed to access debug logs. Keep in mind that the logs will be enabled for both development and production builds when the value is set to `true`.
