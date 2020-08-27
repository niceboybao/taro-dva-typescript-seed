declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV:
      | 'weapp'
      | 'swan'
      | 'alipay'
      | 'h5'
      | 'rn'
      | 'tt'
      | 'quickapp'
      | 'qq';
    [key: string]: any;
  };
};

declare const __SERVER_ENV__: 'sit' | 'prod';
declare const __VERSION__: string;
declare const __ISLOCAL__: boolean;
declare const __TARO_ENV__:
  | 'weapp'
  | 'swan'
  | 'alipay'
  | 'h5'
  | 'rn'
  | 'tt'
  | 'quickapp'
  | 'qq';
