export default (state: boolean = true, action: any) => {
  const { type, payload } = action;
  if (type === 'SET_LOADING') {
    return payload;
  } else {
    return state;
  }
};
