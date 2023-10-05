import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';
import { mobile } from '../Responsive';


const Container = styled.div`
height: 60vh;
background-color: #fcf5f5;
display: flex;
align-items: center;
justify-content: center;
flex-direction:column;
`;
const Title = styled.h1`
font-size:70px;
margin-bottom:20px;
`;
const Description = styled.div`
font-size:24px;
font-weight:300;
margin-bottom:20px;
${mobile({textAlign:"center"})};
`;
const InputContainer = styled.div`
width: 50%;
height: 40px;
background-color: #fff;
border:1px solid lightgray;
display: flex;
align-items: center;
justify-content:space-between;
padding-left: 20px;
${mobile({width:"80%"})};
`;
const Input = styled.input`
border:none;
flex:8;

&:focus{
  outline:none;
}
`;
const Button = styled.button`
height: 100%;
border:none;
background-color: teal;
color:white;
flex:1;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely update from your favourite product.</Description>
      <InputContainer>
        <Input type='email' placeholder='Your email'/>
        <Button>
          <SendIcon/>
        </Button>
      </InputContainer>
    </Container>
  )
}

export default Newsletter
