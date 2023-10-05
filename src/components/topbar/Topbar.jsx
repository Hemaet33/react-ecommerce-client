import React, { useState } from "react";
import "./topbar.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import {userLogout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {
  const [open,setOpen]=useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout=async()=>{
    await userLogout(dispatch)
    navigate('/admin/login')
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/admin"><span className="logo">Admin Dashboard</span></Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" onClick={e=>setOpen(!open)}/>
          <span style={open ? {display:"block"}:{display:"none"}} className="logout" onClick={handleLogout}>Logout</span>
        </div>
      </div>
    </div>
  );
}
