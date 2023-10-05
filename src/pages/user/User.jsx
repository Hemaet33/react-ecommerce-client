import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PublishIcon from '@mui/icons-material/Publish';
import { Link, useParams } from "react-router-dom";
import "./user.css";
import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function User() {
  const userId = useParams().userId;
  const [user, setUser] = useState({})
  const [img, setImg] = useState(null)
  
  useEffect(()=>{
    const getUser = async()=>{
      try {
        const res=await userRequest.get('/users/find/'+userId)
        setUser(res.data)
      } catch (error) {}
    }
    getUser()
  },[userId])

  const handleChange=(e)=>{
    setUser(prev=>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  const handleClick=async(e)=>{
    e.preventDefault();
    if(img!==null){
      const image = new Date().getTime() + img.name;

    const storage = getStorage(app);
    const storageRef = ref(storage, image);

    const uploadTask = uploadBytesResumable(storageRef, img);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
    (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;

    default:
    }
    }, 
    (error) => {
    // Handle unsuccessful uploads
    }, 
    () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       userRequest.patch(`/users/${userId}`,{...user,img:downloadURL})
    });
    }
);
    }else{
      userRequest.patch(`/users/${userId}`,user)
    }


  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
           
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder={user.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                  alt=""
                />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input onChange={e=>setImg(e.target.files[0])} type="file" id="file" style={{ display: "none" }} />
              </div>
              <button onClick={handleClick} className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
