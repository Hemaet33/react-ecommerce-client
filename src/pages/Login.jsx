import styled from 'styled-components';
import { mobile } from '../Responsive';
import { useState } from 'react';
import { login } from '../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
background-size:cover;
display: flex;
align-items: center;
justify-content: center;
`;
const Wrapper = styled.div`
width: 40%;
background-color: #fff;
padding: 20px;
display: flex;
align-items: center;
justify-content: center;
flex-direction:column;
-webkit-box-shadow:0 0 40px rgba(58, 57, 57,0.4), 0 0 80px rgba(58, 57, 57,0.2);
-moz-box-shadow:0 0 40px rgba(58, 57, 57,0.4), 0 0 80px rgba(58, 57, 57,0.2);
box-shadow:0 0 40px rgba(58, 57, 57,0.4), 0 0 80px rgba(58, 57, 57,0.2);
border-radius:10px;


${mobile({width:"75%"})};
`;
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`;
const Form = styled.form`
display: flex;
align-items: center;
justify-content: center;
flex-direction:column;
`;
const Input = styled.input`
min-width:40%;
margin: 20px 20px 0 0;
padding: 10px;

border:none;
border-bottom:1px solid teal;

&:focus{
  outline:1px solid teal;
  border:none;
}
`;
const Linker = styled.a`
font-size: 12px;
margin:20px 0;
text-align: center;
cursor: pointer;
`;
const Button = styled.button`
width: 40%;
padding: 10px 20px;
border:none;
background-color: teal;
color:#fff;
margin:auto;
margin-top:30px;
cursor: pointer;

&:disabled{
  color:grey;
  cursor:not-allowed;
}
`;

const Error = styled.span`
text-align: center;
margin-top:20px;
color:red;
`;

const Login = () => {
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector(state => state.user)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const hadleSubmit = async(e)=>{
    e.preventDefault();
    await login(dispatch, {username, password})
    navigate('/')
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={hadleSubmit}>
          <Input placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
          <Input type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} />
          <Button type='submit' disabled={isFetching}>LOGIN</Button>
          {error && <Error>Something went wrong</Error>}
          <Link to='/admin'>Are you an admin?</Link>
          <Link style={{margin:"auto",backgroundColor:"yellow",padding:"5px 20px",textDecoration:"none",color:"teal"}} to="/register">Register</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
