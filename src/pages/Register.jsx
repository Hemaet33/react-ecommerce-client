import styled from 'styled-components';
import { mobile } from '../Responsive';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
background-size:cover;
display: flex;
align-items: center;
justify-content: center;
`;
const Wrapper = styled.div`
min-width: 40%;
min-height:40%;
background-color: #fff;
padding: 20px;
-webkit-box-shadow:0 0 40px rgba(58, 57, 57,0.4), 0 0 80px rgba(58, 57, 57,0.2);
-moz-box-shadow:0 0 40px rgba(58, 57, 57,0.4), 0 0 80px rgba(58, 57, 57,0.2);
box-shadow:0 0 40px rgba(58, 57, 57,0.4), 0 0 80px rgba(58, 57, 57,0.2);
border-radius:10px;

display: flex;
align-items: center;
flex-direction:column;
justify-content: center;
${mobile({width:"75%"})};
`;
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`;
const Form = styled.form`
display: flex;
flex-wrap:wrap;
`;
const Input = styled.input`
flex:1;
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
const Agreement = styled.span`
font-size: 12px;
margin:20px 0;
`;
const Button = styled.button`
width: 40%;
padding: 10px 20px;
border:none;
background-color: teal;
color:#fff;
margin:auto;
cursor: pointer;
`;

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
    cPassword:"",
  })
  const [message, setMessage] = useState("");

  const handleChange=(e)=>{
    setInputs(prev=>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  const handleClick=async(e)=>{
    e.preventDefault();
    if(inputs.username!=="" && inputs.email!=="" && inputs.password!==""){
      if(inputs.password===inputs.cPassword){
       try {
        await publicRequest.post('/auth/register',inputs);
       setMessage("You have successfully registered")
       } catch (error) {
        setMessage("Something went wrong!")
       }
      }else{
        setMessage("You should confirm password well!")
      }
    }else{
      setMessage("No field should be empty!")
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input type="text" name="username" onChange={handleChange} placeholder="Username" />
          <Input type='email' name="email" onChange={handleChange}  placeholder="Email" />
          <Input type="password"  name="password" onChange={handleChange} placeholder="Password" />
          <Input type="password" name="cPassword" onChange={handleChange}  placeholder="Confirm Password" />
          <Agreement>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></Agreement>

          <Button onClick={handleClick}>CREATE</Button>
          <Link style={{margin:"auto",backgroundColor:"yellow",padding:"5px 20px",textDecoration:"none",color:"teal"}} to="/login">Have an account?</Link>
        </Form>

        {message!=="" && <h3 style={{textAlign:"center",marginTop:"10px"}}>{message}</h3>}
      </Wrapper>
    </Container>
  )
}

export default Register
