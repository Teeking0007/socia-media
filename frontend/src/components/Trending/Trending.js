import './Trending.css';
import { trendings } from '../../data/data';
import Trend from '../Trend/Trend';

const Trending = () => {
    return ( 
        <div className='trending'>
            <h3>Trending for you</h3>
            {
                trendings.map((trend, id)=>{
                    return(
                        <Trend key={id} trend={trend}/>
                    )
                })
            }
        </div>
     );
}
 
export default Trending;