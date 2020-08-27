import { ActionCreatorsMapObject, Action } from 'redux';

export type Model = {
  home: IHome.PageState;
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace IHome {
  interface Params {}
  interface PageState {
    loan: number;
  }
  interface PageOwnProps {}
  interface ActionCreators extends ActionCreatorsMapObject {
    update: (state: Partial<PageState>) => Action;
    setLoan: (state: string) => Action;
  }
  type Props = PageState & ActionCreators;
  type MapStateToProps = (model: Model) => PageState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type MapDispatchToProps = (f: any) => ActionCreators;
}
