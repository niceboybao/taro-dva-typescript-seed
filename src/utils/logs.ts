import Taro from '@tarojs/taro';
import sentry from '@/utils/sentry';

let log: Taro.RealtimeLogManager | null;
if (process.env.TARO_ENV === 'weapp' && __SERVER_ENV__ === 'prod') {
  log = Taro.getRealtimeLogManager ? Taro.getRealtimeLogManager() : null;
} else if (process.env.TARO_ENV === 'h5') {
  log = null;
}

export const catchLogs = (e, isShowAlert = true): void => {
  if (e && (e.returnMsg || e.errMsg)) {
    isShowAlert && alert(e.returnMsg || e.errMsg);
    sentry.warning(JSON.stringify(e));
    return;
  }
  if (!e || !e.returnMsg || !e.authErrMsg) {
    // 抛出到全局onError进行上报
    throw e;
  }
  sentry.errors(e);
};

export default {
  info(...args: any[]) {
    console.log(args);
    if (!log) return;
    log.info.apply(log, args);
  },
  warn(...args: any[]) {
    console.warn(args);
    if (!log) return;
    log.warn.apply(log, args);
  },
  error(...args: any[]) {
    console.error(args);
    if (!log) return;
    log.error.apply(log, args);
  },
  setFilterMsg(msg: string): void {
    // 从基础库2.7.3开始支持
    if (!log || !log.setFilterMsg) return;
    if (typeof msg !== 'string') return;
    log.setFilterMsg(msg);
  },
  addFilterMsg(msg: string): void {
    // 从基础库2.8.1开始支持
    if (!log || !log.addFilterMsg) return;
    if (typeof msg !== 'string') return;
    log.addFilterMsg(msg);
  },
};
