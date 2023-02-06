import * as UserApi from '../api/UserApi'

export const updateUser = (id, userData) => async(dispatch) =>{
    dispatch({type: 'UPDATING_START'})
    try {
        const {data} = await UserApi.updateUser(id, userData)
        dispatch({type: 'UPDATING_SUCCESSFUL', payload: data})
    } catch (error) {
        console.log(error)
        dispatch({type: 'UPDATING_FAIL'})
    }
}
export const followUser = (id, data) => async(dispatch) =>{
    
    try {
     await UserApi.followUser(id, data)
     dispatch({type: 'FOLLOW_USER', payload: id})
    } catch (error) {
        console.log(error)
        dispatch({type: 'FOLLOW_FAIL'})
    }
}
export const unFollowUser = (id, data) => async(dispatch) =>{
    
    try {
     await UserApi.unFollowUser(id, data)
     dispatch({type: 'UNFOLLOW_USER', payload: id})
    } catch (error) {
        console.log(error)
        dispatch({type: 'FOLLOW_FAIL'})
    }
}