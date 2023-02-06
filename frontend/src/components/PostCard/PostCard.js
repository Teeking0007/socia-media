import {useState, useRef} from 'react';
import './PostCard.css';
import profile from '../../img/profile.jpg';
import { FaImage, FaTimes } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { FaCalendar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../store/action/UploadAction';

const PostCard = () => {
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const desc = useRef();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.authReducer.authData)
    const loading = useSelector(state=>state.postReducer.uploading)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER 
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(img)
        }
    }
    const submitPost = (e) =>{
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }
        if (image) {
            const data = new FormData ()
            const filename = Date.now() + image.name
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
       dispatch(uploadPost(newPost))
      setImage(null)
      desc.current.value=''
    }
    return ( 
        <div className='post-card'>
            <div className='p-img'>
            <img src={user.profilePicture? serverPublic + user.profilePicture : serverPublic + 'user.png'} alt='profile'/>
            </div>
            <div className='p-share'>
                <input type='text' placeholder='what is happening now' ref={desc} required/>
                <div className='options'>
                    <div onClick={()=>imageRef.current.click()}> 
                        <FaImage style={{color: 'var(--photo)', fontSize: '1rem'}}/>
                        Photo
                    </div>
                    <div>
                        <FaVideo style={{color: 'var(--video)', fontSize: '1rem'}}/>
                        Video
                    </div>
                    <div>
                        <GoLocation style={{color: 'var(--location)', fontSize: '1rem'}}/>
                        Location
                    </div>
                    <div>
                        <FaCalendar style={{color: 'var(--schedule)', fontSize: '1rem'}}/>
                        Schedule
                    </div>
                    <button className='button' onClick={submitPost} >
                        {loading? 'uploading' : 'Share'}
                    </button>
                </div>
                <div style={{display: 'none'}}>
                    <input type='file' name='myImage' ref={imageRef} onChange={onImageChange} />
                </div>
                {image && (
                    <div className='previewImage'>
                        <FaTimes className='times' onClick={()=>setImage(null)}/>
                        <img src={URL.createObjectURL(image)} alt=''/>
                    </div>
                    )}
            </div>

        </div>
     );
}
 
export default PostCard;