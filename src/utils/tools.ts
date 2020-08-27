import Taro from '@tarojs/taro';

export const alert = (content: string): void => {
  Taro.showModal({ title: '提示', content, showCancel: false });
};

export default {};
