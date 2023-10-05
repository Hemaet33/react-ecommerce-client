import { useDispatch } from 'react-redux';
import './adminlogin.css';
import React, { useState } from 'react'
import {   userLogin } from '../../redux/apiCalls';
import { useNavigate } from 'react-router';

const AdminLogin = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username:"",
    password:""
  });

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await userLogin(dispatch, {username:user.username, password:user.password})
      navigate('/admin',{ replace: true })
    } catch (error) {
      
    }
  }

  const handleChange = (e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  
  return (
    <div className="login_container">
      <form>
      <input type="text" name='username' placeholder='Username' onChange={handleChange}/>
      <input type="password" name='password' placeholder='Password' onChange={handleChange}/>
      <button onClick={handleSubmit}>Login</button>
    </form>
    </div>
  )
}

export default AdminLogin
