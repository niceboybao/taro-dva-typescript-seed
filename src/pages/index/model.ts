// import { getLoan } from './service';
import { catchLogs } from '@/utils/logs';

import { IHome, Model } from './interface';
import { NAMESPACE, UPDATE, SETLOAN, actionCreators } from './actions';

export default {
  namespace: NAMESPACE,
  state: {
    loan: 20000,
  },
  effects: {
    *[SETLOAN]({ payload }, { call, put, select }) {
      try {
        const operator = payload111;
        const loan = yield select((model: Model) => model.home.loan);
        switch (operator) {
          case '+':
            yield put(actionCreators.update({ loan: loan + 10000 }));
            break;
          default:
            yield put(actionCreators.update({ loan: loan - 10000 }));
            break;
        }
      } catch (e) {
        catchLogs(e);
      }
    },
  },
  reducers: {
    [UPDATE](state: IHome.PageState, { payload }) {
      return { ...state, ...payload };
    },
  },
};
