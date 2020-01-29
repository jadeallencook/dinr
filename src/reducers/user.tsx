export default (state = null, action: {
    type: string;
    payload: any;
}) => {
    switch (action.type) {
        default:
            return action.payload || null;
    }
}