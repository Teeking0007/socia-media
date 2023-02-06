import './HomeLeft.css'
import FollowersCard from "../FollowersCard/FollowersCard";
import Logo from "../Logo/Logo";
import ProfileCard from "../ProfileCard/ProfileCard";


const HomeLeft = () => {
    return ( 
        <div className='home-left'>
            <Logo/>
            <ProfileCard location={'homepage'} />
            <FollowersCard/>
        </div>
     );
}
 
export default HomeLeft;