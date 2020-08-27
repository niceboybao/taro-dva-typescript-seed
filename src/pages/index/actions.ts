import { bindNamespace } from '@/utils/bindNameSpace';
import { NAMESPACE_HOME } from '@/constants/namespace';
import { IHome } from './interface';

// 组件内namespace 统一出口
export const NAMESPACE = NAMESPACE_HOME;
export const UPDATE = 'udate';
export const SETLOAN = 'setLoan';

export const actionCreators: IHome.ActionCreators = {
  update: (state) => ({ type: UPDATE, payload: state }),
  setLoan: (state) => ({ type: SETLOAN, payload: state }),
};
export const namedActionCreators = bindNamespace(
  NAMESPACE,
  actionCreators,
) as IHome.ActionCreators;
