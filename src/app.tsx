// import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import log from '@/utils/logs';
import { alert } from '@/utils/tools';
import * as dva from '@/utils/dva';
import sentry from '@/utils/sentry';
import models from '@/models/index';
import { REQUEST_ERROR_MESSAGE } from '@/constants/tips';
import Index from './pages/index/index';

import './app.scss';

const dvaApp = dva.createApp({
  initialState: {},
  onError: (err, _, effectObj) => {
    // 处理effect里调用接口未加try catch的情况
    if (err && err.returnMsg === REQUEST_ERROR_MESSAGE) {
      alert(REQUEST_ERROR_MESSAGE);
    }
    log.error(err, effectObj);
  },
  models,
});

const store = dvaApp.getStore();

console.log('process.env', process.env);

sentry.init();

// 如果需要在 h5 环境中开启 React Devtools
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  componentDidMount() {
    console.log('update');
    Taro.getSystemInfo()
      .then((info) => {
        console.log(
          `__DEVICE__: ${JSON.stringify({
            brand: info.brand,
            model: info.model,
            system: info.system,
            SDKVersion: info.SDKVersion,
          })}`,
        );
      })
      .catch(() => {});
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: ['pages/index/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    networkTimeout: {
      request: 30000,
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
