import PostView from '../PostView/PostView';
import ProfileCard from '../ProfileCard/ProfileCard';
import './ProfileFeed.css';

const ProfileFeed = () => {
    return ( 
        <div className='profile-feed'>
            <ProfileCard location = 'profilePage' />
            <PostView/>
        </div>
     );
}
 
export default ProfileFeed;