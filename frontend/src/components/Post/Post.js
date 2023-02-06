import "./Post.css";
import { FaHeart, FaRegCommentDots, FaShareSquare } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useState } from "react";
import { likePost } from "../../store/api/PostApi";


const Post = ({post}) => {
  const {user} = useSelector(state=>state.authReducer.authData)
  const [liked, setLiked] = useState(post.likes.includes(user._id))
  const [likes, setLikes] = useState(post.likes.length)
  const handleLike = () => {
    setLiked((prev)=>!prev)
    likePost(post._id, user._id) 
    liked? setLikes((prev)=>prev - 1) : setLikes((prev)=>prev + 1)
  }
  return (
    <div className="post">
      <img src={post.image? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ''} alt="" /> 
      <div className="post-icons" onClick={handleLike}>
        <div >
        {
          liked? <FaHeart style={{ color: "var(--orange)", cursor: "pointer" }}  /> : <FaRegHeart style={{ cursor: "pointer" }}/>
        }
        </div>
        
        <FaRegCommentDots style={{ cursor: "pointer" }} />
        <FaShareSquare style={{ cursor: "pointer" }} />
      </div>
      <span style={{fontSize: '12px'}}>{likes} likes</span>
      <div>
        <span>{post.desc}</span>
      </div>
    </div>
  );
};

export default Post;
