import HomeFeeds from '../../components/HomeFeeds/HomeFeeds';
import HomeLeft from '../../components/HomeLeft/HomeLeft';
import HomeRight from '../../components/HomeRight/HomeRight';
import './Home.css'

const Home = () => {
    return ( 
        <div className='home'>
            <div className='homeLeft'><HomeLeft/></div>
            <div className='homeFeed'><HomeFeeds/></div>
            <div className='homeRight'><HomeRight/></div>
        </div>
     );
}
 
export default Home;