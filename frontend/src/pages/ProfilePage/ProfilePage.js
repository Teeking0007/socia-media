import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import './ProfilePage.css';
import HomeRight from '../../components/HomeRight/HomeRight';
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed';


const ProfilePage = () => {
    return ( 
        <div className='profile-page'>
            <div className='profileLeft'><ProfileLeft/></div>
            <div className='profileFeed'><ProfileFeed/></div>
            <div className='profileRight'><HomeRight/></div>
        </div>
     );
}
 
export default ProfilePage;