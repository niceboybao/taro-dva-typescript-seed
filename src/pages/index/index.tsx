import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { MyButton } from '@/components/index';

import { namedActionCreators } from './actions';
import { IHome } from './interface';
import './index.scss';

const mapStateToProps: IHome.MapStateToProps = (model) => ({
  ...model.home,
  // startButtonLoading: Boolean(model.loading.effects[FACE_START]),
});
const mapDispatchToProps: IHome.MapDispatchToProps = (f) =>
  bindActionCreators(namedActionCreators, f);

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component<IHome.Props> {
  config: Config = {
    navigationBarTitleText: '首页',
  };

  handleUpdateLoan(operator: string) {
    this.props.setLoan(operator);
  }

  render() {
    const { loan } = this.props;
    return (
      <View
        className={classnames('home', {
          loan1: loan > 20000,
          loan2: loan < 20000,
        })}
      >
        <Text>{loan}</Text>
        <MyButton onClick={() => this.handleUpdateLoan('+')}>
          额度加一万
        </MyButton>
        <MyButton onClick={() => this.handleUpdateLoan('-')}>
          额度减一万
        </MyButton>
        <MyButton onClick={() => this.handleUpdateLoan('-')} disabled>
          不可点击
        </MyButton>
      </View>
    );
  }
}
