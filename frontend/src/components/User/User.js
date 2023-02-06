import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../store/action/UserAction";

const User = ({person}) => {
    const {user} = useSelector((state)=>state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch()
    const [follow, setFollow] = useState(person.followers.includes(user._id) )
    

    const handleFollow = () => { follow? dispatch(unFollowUser(person._id, user)) :
        dispatch(followUser(person._id, user))
        setFollow((prev)=>!prev)
    }
    return ( 
        <div className='f-b' >
                            <div>
                                <img src={person.profilePicture? serverPublic + person.profilePicture : serverPublic + 'user.png' }  style={{width: '3rem', height: '3rem', borderRadius: '50%'}}/> 
                                
                                <div className='f-name'>
                                    <span>{person.firstname} {person.lastname}</span>
                                    <span>{person.username}</span>
                                </div>
                            </div>
                            <button className={follow? 'button unfollow' : 'button'}onClick={handleFollow} >{follow? 'Unfollow' : 'Follow'}</button>
                        </div>
     );
}
 
export default User;