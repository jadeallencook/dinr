export default (
  state: number | null = null,
  action: {
    type: string;
    payload: number | null;
  }
) => (action.type === 'SET_ZIPCODE' ? action.payload : state);
