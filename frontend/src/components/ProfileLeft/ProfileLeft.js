import FollowersCard from '../FollowersCard/FollowersCard';
import InfoCard from '../InfoCard/InfoCard';
import Logo from '../Logo/Logo';
import './ProfileLeft.css';

const ProfileLeft = () => {
    return ( 
        <div className='profile-left'>
            <Logo/>
            <InfoCard/>
            <FollowersCard/>
        </div>
     );
}
 
export default ProfileLeft;