

const postReducer = (state={posts: [], uploading: false,  error: false}, action) =>{
    switch (action.type) {
        case "UPLOAD_START" :
            return {
                ...state, uploading: true, error: false
            }
        case "UPLOAD_SUCCESSFUL" :
            return {
                ...state, posts: [action.payload, ...state.posts], uploading: false, error: false

            }
        case "UPLOAD_FAIL" :
            return {
                ...state, uploading: false, error: true
            }
        case 'RETREIVING_START' : 
            return{
                ...state, uploading: true, error: false
            }
        case 'RETREIVING_SUCCESSFUL' : 
            return {
                ...state, posts:action.payload, uploading: false, error: false

            }
        case 'RETREIVING_FAIL' : 
        return {
            ...state, uploading: false, error: true
        }

        default: 
        return state;
    }
}


export default postReducer;