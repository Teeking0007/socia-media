import './FollowersCard.css'
import { useSelector } from 'react-redux';
import User from '../User/User';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllUsers } from '../../store/api/UserApi';


const FollowersCard = () => {
    const {user} = useSelector((state)=>state.authReducer.authData)
    const [persons, setPersons] = useState([])
    useEffect(()=>{
        const fetchUsers = async() => {
           const {data} = await getAllUsers()
           setPersons(data)
        }
        fetchUsers()
    },[])
    return ( 
        <div className='followerscard'>
            <span>People you may know!</span>
            {
                persons.map((person, id)=>{
                    if (person._id !== user._id) {
                        return (
                        
                            <User person={person} key={id} />
                        )
                    }
                    
                })
            }
        </div>
     );
}
 
export default FollowersCard;