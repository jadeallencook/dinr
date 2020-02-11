export default (
  state: {
    type: string;
    text: string;
  }[] = [],
  action: {
    type: string;
    payload: any;
  }
) => {
  if (
    action.type === 'ADD_NOTIFICATION' &&
    action.payload.type &&
    action.payload.text
  ) {
    return state
      .map((value: any) => value.text)
      .indexOf(action.payload.text) === -1
      ? [
          ...state,
          {
            ...action.payload,
            time: new Date().getTime()
          }
        ]
      : state;
  } else if (action.type === 'REMOVE_NOTIFICATION') {
    return state.length > 1 ? state.splice(action.payload, 1) : [];
  } else {
    return state;
  }
};
