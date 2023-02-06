import './Logo.css'
import { FaTwitter } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

const Logo = () => {
    return ( 
        <div className='logo'>
            <FaTwitter style={{color: 'var(--orange)', fontSize: '2rem', cursor: 'pointer'}}/>
            <div className='search'>
                <input type='text' placeholder='#explore'/>
                <div>
                    <FaSearch  style={{color: 'white'}}/>
                </div>
            </div>
        </div>
     );
}
 
export default Logo;