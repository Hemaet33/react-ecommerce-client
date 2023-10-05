import { useEffect, useState } from "react";
import {userRequest} from '../../requestMethods'
import "./widgetSm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function WidgetSm() {
  const [users, setUsers] = useState([])
  const [admin, setAdmin] = useState(false)

  useEffect(()=>{
    const getUser = async()=>{
      try {
        const res = await userRequest.get('users?new=true')
        setUsers(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    
    getUser();
  },[admin])

  const handleAdmin=async(id,identity)=>{
    if(identity=="isAdmin"){
      const removed=confirm("Do you want to remove admin status?");
      if(removed){
        await userRequest.patch(`/users/${id}`,{isAdmin:false});
      }
    }else{
      const made=confirm("Do you want to make admin status?");
      if(made){
        await userRequest.patch(`/users/${id}`,{isAdmin:true});
      }
    }
    setAdmin(!admin)
  }
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
      {users.map(user=>(
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          {user.isAdmin ? <button className="widgetSmButton" onClick={()=>handleAdmin(user._id,"isAdmin")}>
            <VisibilityIcon className="widgetSmIcon" />
            Admin
          </button> : <button className="widgetSmButton" onClick={()=>handleAdmin(user._id,"notAdmin")}>
            <VisibilityIcon className="widgetSmIcon" />
            Make admin
          </button>}
        </li>
        ))}
      </ul>
    </div>
  );
}
