export default (
  state: object[] = [],
  action: {
    type: string;
    payload: object[];
  }
) => (action.type === 'SET_HOSTING' ? action.payload : state);
