// const Sentry = process.env.TARO_ENV === 'weapp' && require('sentry-miniapp')
import * as Sentry from '@sentry/browser';
import { SENTRY_DNS } from '@/constants/index';

const pkg = require('../../package.json');

const init = () => {
  console.log(`${__SERVER_ENV__}@${__VERSION__}`);
  Sentry.init({
    dsn: SENTRY_DNS,
    environment: __SERVER_ENV__, //  "sit" | "prod"
    release: `${__VERSION__}`,
  });

  Sentry.configureScope((scope) => {
    // scope.setExtra('battery', 0.7);
    // scope.setUser({ id: openid });
    // scope.setLevel(Sentry.Severity.Warning);
    // Sentry.captureMessage('this is a message');
    // Sentry.captureMessage('this is a debug message', Sentry.Severity.Debug);
    // Sentry.captureMessage('this is a info message', Sentry.Severity.Info);
    // Sentry.captureMessage('this is a warning message', Sentry.Severity.Warning);
    // Sentry.captureMessage('this is a error message', Sentry.Severity.Error);
    // Sentry.captureMessage('this is a fatal message', Sentry.Severity.Fatal);
    // scope.clear();
  });
};
const setUserLevel = (username?: string) => {
  Sentry.configureScope((scope) => {
    scope.setUser({ username });
  });
};
const setTagsLevel = (tagKey: string, tagValue: string) => {
  Sentry.configureScope((scope) => {
    scope.setTag(tagKey, tagValue);
  });
};
const setContext = (key, value) => {
  Sentry.setContext(key, value);
  // Sentry.setContext("__DEVICE__", {
  //   name: "Mighty Fighter",
  //   age: 19,
  //   attack_type: "melee"
  // });
};

// 日志等级
const debug = (message: string) =>
  captureMessage(message, Sentry.Severity.Debug);
const info = (message: string) => captureMessage(message, Sentry.Severity.Info);
const warning = (message: string) =>
  captureMessage(message, Sentry.Severity.Warning);
const error = (message: string) =>
  captureMessage(message, Sentry.Severity.Error);
const fatal = (message: string) =>
  captureMessage(message, Sentry.Severity.Fatal);
const errors = (message) => Sentry.captureException(message);

const captureMessage = (message, level) => {
  Sentry.captureMessage(message, level);
  // if (level === 'debug' || level === 'info') {
  //   console.log(message)
  //   return
  // }
  // console.error(message)
};

export default {
  init,
  setUserLevel,
  setTagsLevel,
  setContext,
  debug,
  info,
  warning,
  error,
  errors,
  fatal,
};
