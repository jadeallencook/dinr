export default (
  state: number | null = null,
  action: {
    type: string;
    payload: any;
  }
) => {
  if (action.type === 'SET_ZIPCODE') {
    return action.payload;
  } else if (
    action.type === 'SET_PROFILE' &&
    action.payload &&
    action.payload.personal &&
    action.payload.personal.zipcode
  ) {
    return action.payload.personal.zipcode;
  } else {
    return state;
  }
};
