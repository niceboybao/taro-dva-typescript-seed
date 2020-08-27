import Taro, { Component } from '@tarojs/taro';
import { Button } from '@tarojs/components';
import classnames from 'classnames';
import MyButtonProps from './interface';

import './index.scss';

export default class MyButton extends Component<MyButtonProps> {
  static externalClasses = ['external-classes'];

  render() {
    const { onClick, disabled = false, loading = false, children } = this.props;

    return (
      <Button
        loading={loading}
        className={classnames('my-button external-classes', {
          disabled,
        })}
        hoverClass="button-hover"
        disabled={disabled}
        onClick={() => {
          !loading && onClick && onClick();
        }}
      >
        {children}
      </Button>
    );
  }
}
