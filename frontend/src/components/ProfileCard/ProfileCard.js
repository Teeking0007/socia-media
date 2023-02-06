import "./ProfileCard.css";
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'

const ProfileCard = ({location}) => {
  const {user} = useSelector((state)=>state.authReducer.authData)
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER 
  return (
    <div className="profile-card">
      <div className="profile-img">
        <img src={user.coverImage? serverPublic + user.coverImage : serverPublic + 'defaultCover.jpg' } />
        <img src={user.profilePicture? serverPublic + user.profilePicture : serverPublic + 'user.png'} />
      </div>
      <div className="profile-name">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.about}</span>
      </div>
      <div className="follows">
        <hr />
        <div className="f-f">
          <div className="followers">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="followers">
            <span>{user.following.length}</span>
            <span>Followering</span>
          </div>
          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div className="followers">
                <span>{posts.filter((post)=>post.userId === user._id).length }</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === 'profilePage' ? "" : <span><Link to = {`/profile/${user._id}`} style={{textDecoration: 'none', color: 'inherit'}} >My profile</Link></span>}
    </div>
  );
};

export default ProfileCard;
