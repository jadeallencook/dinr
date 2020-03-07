export default (state: object | null = null, action: {
  type: string;
  payload: object | null;
}) => (action.type === 'SET_HOST') ? action.payload : state;