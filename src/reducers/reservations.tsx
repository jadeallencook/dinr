export default (
  state: object[] = [],
  action: {
    type: string;
    payload: object[] | null;
  }
) => (action.type === 'SET_RESERVATIONS' ? action.payload : state);
