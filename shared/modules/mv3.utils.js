import browser from 'webextension-polyfill';

export const isManifestV3 = () => {
  console.log(
    '[is manifest v3]',
    browser.runtime.getManifest().manifest_version,
  );
  return browser.runtime.getManifest().manifest_version === 3;
};
