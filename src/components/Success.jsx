import { Link } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction:column;
gap:15px;
width: 100vw;
height: 100vh;
`;
const Successful = styled.span`
background-color:teal;
width: 200px;
height: 60px;
color:#fff;
display: flex;
align-items: center;
justify-content: center;
font-size:30px;
-webkit-box-shadow:0 2px 2px teal;
-ms-box-shadow:0 2px 2px teal;
box-shadow:0 2px 2px teal;
`;
const TextSpan = styled.span`
width: 30%;
font-size:20px;
text-align: center;
`;


const Success = () => {
  return (
    <Container>
      <Successful>Success !</Successful>
      <TextSpan>Your order is being prepared. Thanks for choosing us.</TextSpan>
      <Link style={{backgroundColor:"#fff",border:"2px solid grey", padding:"5px 10px",color:"grey"}} to="/">Go to home page</Link>
    </Container>
  )
}

export default Success
