export default (state: boolean = true, action: {
  type: string;
  payload: boolean;
}) => (action.type === 'SET_LOADING') ? action.payload : state;
