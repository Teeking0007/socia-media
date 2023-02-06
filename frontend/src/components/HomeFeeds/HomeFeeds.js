import PostCard from '../PostCard/PostCard';
import PostView from '../PostView/PostView';
import './HomeFeeds.css';


const HomeFeeds = () => {
    return ( 
        <div className="home-feeds">
            <PostCard/>
            <PostView/>
        </div>
     );
}
 
export default HomeFeeds;