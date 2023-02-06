import * as AuthApi from '../api/AuthApi'


export const logIn = (formData) => async(dispatch) => {
    try {
        dispatch({type: 'AUTH_START'})
        const {data} = await AuthApi.logIn(formData)
        dispatch({type: 'AUTH_SUCCESS', payload: data})
    } catch (error) {
        console.log(error)
        dispatch({type: 'AUTH_FAIL'})
    }
}
export const signUp = (formData) => async(dispatch) => {
    try {
        dispatch({type: 'AUTH_START'})
        const {data} = await AuthApi.signUp(formData)
        dispatch({type: 'AUTH_SUCCESS', payload: data})
    } catch (error) {
        console.log(error)
        dispatch({type: 'AUTH_FAIL'})
    }
}

export const logOut = () => async(dispatch) => {
    dispatch({type: 'LOGOUT'})
}