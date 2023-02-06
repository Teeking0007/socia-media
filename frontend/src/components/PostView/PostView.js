import './PostView.css';
import Post from '../Post/Post';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { getTimelinePosts } from '../../store/action/PostAction';

const PostView = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.authReducer.authData)
    let {posts, uploading} = useSelector((state)=>state.postReducer)
    useEffect(()=>{dispatch(getTimelinePosts(user._id))},[])
    const params = useParams()
    if(!posts) return 'No post Yet!'
    if(params.id) posts = posts.filter((post)=>post.userId===params.id)
    return ( 
        <div className='post-view'>
            {uploading? 'fetching posts...' : 
                posts.map((post, id)=>{
                    return(
                        <Post key={id} post={post}/>
                    )
                })
             }
            
        </div>
     );
}
 
export default PostView;