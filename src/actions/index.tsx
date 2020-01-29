export const login = (user: Object | null) => {
    return {
        type: 'LOGIN',
        payload: user
    }
}