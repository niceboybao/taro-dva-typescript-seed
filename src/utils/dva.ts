import Taro from '@tarojs/taro';
import { create } from 'dva-core';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, Persistor } from 'redux-persist';

let app;
let store;
let dispatch;
let persistor: Persistor;

export function createApp(opt) {
  let onActionArr = [routerMiddleware(Taro)];
  // redux日志
  if (__SERVER_ENV__ !== 'prod') {
    onActionArr.push(createLogger());
  }
  opt.onAction = onActionArr;
  app = create(opt);
  app.use(createLoading({}));

  // 适配支付宝小程序
  if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY) {
    global = {};
  }

  if (!global.registered) opt.models.forEach((model) => app.model(model));
  global.registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;

  if (process.env.TARO_ENV === 'h5') {
    persistor = persistStore(store);
  }

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}

export function getDispatch() {
  return app.dispatch;
}
export function getState() {
  return store.getState();
}
export function getPersistor() {
  return persistor;
}
