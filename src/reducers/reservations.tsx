export default (
  state: object[] | null = [],
  action: {
    type: string;
    payload: object[] | null;
  }
) =>
  action.type === 'SET_RESERVATIONS' || action.type === 'LOGOUT'
    ? action.payload
    : state;
