export const named = (namespace: string, type: string): string =>
  `${namespace}/${type}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: string; payload: any };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionCreator<T extends any[]> = (...args: T) => Action;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withNamespace = <T extends any[]>(
  namespace: string,
  actionCreator: ActionCreator<T>,
) => (...args: T) => {
  const { type, payload } = actionCreator(...args);
  return {
    type: named(namespace, type),
    payload,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bindNamespace = (namespace: string, actionCreators): any => {
  const namedActionCreators = {};
  for (const key in actionCreators) {
    namedActionCreators[key] = withNamespace(namespace, actionCreators[key]);
  }
  return namedActionCreators;
};
