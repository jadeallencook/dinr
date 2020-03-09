export default (
  state: object[] | null = [],
  action: {
    type: string;
    payload: object[] | null;
  }
) => (action.type === 'SET_HOSTING' ? action.payload : state);
