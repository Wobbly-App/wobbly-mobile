import url from 'url';

import Constants from 'expo-constants';
import { NativeModules } from 'react-native';

/** Get base url of rn-packager */
function getPackagerBaseUrl() {
  if (!NativeModules.SourceCode || !NativeModules.SourceCode.scriptURL) {
    return '';
  }

  const scriptURL = url.parse(NativeModules.SourceCode.scriptURL);
  return `${scriptURL.protocol}//${scriptURL.hostname}`;
}

export const config = {
  // default values unless overridden by app.json
  backendUrl: `${getPackagerBaseUrl()}:5280`,
  // values specified in expo.extra field of app.json
  ...Constants.manifest.extra,
};

if (__DEV__) {
  // tslint:disable-next-line:no-console
  console.log(`*** Running using profile: ${Constants.manifest.slug} ***`);
}
