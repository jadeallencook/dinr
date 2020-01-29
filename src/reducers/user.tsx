export const user = (state = null, action: {
    type: string;
    payload: any;
}) => {
    switch (action.type) {
        default:
            return action.payload;
    }
}