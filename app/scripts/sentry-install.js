import setupSentry from './lib/setupSentry';

// The root compartment will populate this with hooks
global.sentryHooks = {};

// setup sentry error reporting
global.sentry = setupSentry({
  release: process.env.METAMASK_VERSION + process.env.METAMASK_SUBVERSION,
  getState: () => global.sentryHooks?.getSentryState?.() || {},
});
