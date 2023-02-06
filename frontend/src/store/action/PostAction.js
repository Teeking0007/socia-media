import * as PostApi from '../api/PostApi'

export const getTimelinePosts = (id) => async(dispatch) =>{
    
    try {
        dispatch({type: 'RETREIVING_START'})
        const {data} = await PostApi.getTimelinePosts(id)
        dispatch({type: 'RETREIVING_SUCCESSFUL', payload: data})
    } catch (error) {
        console.log(error)
        dispatch({type: 'RETREIVING_FAIL'})
    }
}