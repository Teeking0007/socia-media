import { useState, useEffect } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { FaRegEdit } from "react-icons/fa";
import "./InfoCard.css";
import { useSelector, useDispatch, } from "react-redux";
import {useParams} from 'react-router-dom'
import * as UserApi from '../../store/api/UserApi.js'
import { logOut } from "../../store/action/AuthAction";
import { uploadImage } from "../../store/action/UploadAction";
import { updateUser } from "../../store/action/UserAction";
const InfoCard = () => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const params = useParams()
  const {user} = useSelector((state)=>state.authReducer.authData)

  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState({})
  const {password, ...others} = user
  const [formData, setFormData] = useState(others)
  const [coverImage, setCoverImage] = useState(null)
  const [profilePicture, setProfilePicture] = useState(null)
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
   const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === 'profilePicture'? setProfilePicture(img) : setCoverImage(img)
  }
   }
  const handleSumbit = (e) => {
    e.preventDefault();
    const userData = formData
    if (profilePicture) {
      const data = new FormData ()
      const filename = Date.now() + profilePicture.name
      data.append("name", filename)
      data.append("file", profilePicture)
      userData.profilePicture = filename
      try {
        dispatch(uploadImage(data))
    } catch (error) {
        console.log(error)
    }
    } 
    if (coverImage) {
      const data = new FormData ()
      const filename = Date.now() + coverImage.name
      data.append("name", filename)
      data.append("file", coverImage)
      userData.coverImage = filename
      try {
        dispatch(uploadImage(data))
    } catch (error) {
        console.log(error)
    }
    }
    dispatch(updateUser(params.id, userData))
    setModalOpen(false)
  }
  const handleLogOut = () => {
    dispatch(logOut())
  }

  useEffect(()=>{
    const fetchProfileUser = async() => {
      if (profileUserId === user._id) {
        setProfileUser(user)
      } else {
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)
      }
    }
    fetchProfileUser()
  },[user])


  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="info-card">
      <div className="info-edit">
        <span>Profile Info</span>
        {user._id===profileUserId? <FaRegEdit
          onClick={() => setModalOpen(true)}
          style={{ cursor: "pointer" }}
        /> : '' }
        
      </div>
      <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size={500}
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Your Info"
      >
        <form className="info-form">
          <div className="i-input">
            <input type="text" placeholder="First Name" name="firstname" onChange={handleChange} value={formData.firstname}/>
            <input type="text" placeholder="Last Name" name="lastname" onChange={handleChange} value={formData.lastname}/>
          </div>
          <div className="i-input">
            <input type="text" placeholder="About" name="about" onChange={handleChange} value={formData.about} />
            <input type="text" placeholder="Location" name="location" onChange={handleChange} value={formData.location}/>
          </div>
          <div className="i-input">
            <input type="text" placeholder="Handle" name="handle" onChange={handleChange} value={formData.handle} />
            <input type="text" placeholder="Relationship" name="relationship" onChange={handleChange} value={formData.relationship} />
          </div>
          <div className="i-input">
            <div >
              Profile Picture
              <input type="file" name="profilePicture" onChange={handleImage} />
            </div>
            <div>
              Cover Image
              <input type="file" name="coverImage" onChange={handleImage} />
            </div>
          </div>
          <button className="button i-btn" onClick={handleSumbit} >Update</button>
        </form>
      </Modal>
      <div className="info">
        <div className="info-desc">
          <span>
            <b>Name:</b>
          </span>
          <span>{profileUser.firstname} {profileUser.lastname}</span>
        </div>
        <div className="info-desc">
          <span>
            <b>About:</b>
          </span>
          <span>{profileUser.about}</span>
        </div>
        <div className="info-desc">
          <span>
            <b>Location:</b>
          </span>
          <span>{profileUser.location}</span>
        </div>
        <div className="info-desc">
          <span>
            <b>Relationship:</b>
          </span>
          <span>{profileUser.relationship}</span>
        </div>
        <div className="info-desc">
          <span>
            <b>Handle:</b>
          </span>
          <span>{profileUser.handle}</span>
        </div>
      </div>
      <button className="button info-btn" onClick={handleLogOut} >Logout</button>
    </div>
  );
};

export default InfoCard;
