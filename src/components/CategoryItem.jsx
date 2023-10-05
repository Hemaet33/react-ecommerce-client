import styled from "styled-components"
import { mobile } from "../Responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
flex:1;
height: 20vh;
position: relative;
background-color:rgba(0,34,50,.5);
`;
const Info = styled.div`
position: absolute;
background-color: rgba(58, 57, 57,0.2);
width: 100%;
height: 100%;
top: 0;
left: 0;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
`;
const Title = styled.h1`
color:white;
margin-bottom:20px;
`;
const Button = styled.button`
border:none;
padding: 10px;
background-color: #fff;
color:grey;
cursor: pointer;
`;

const CategoryItem = ({item}) => {
  return (
    <Container>
      <Link to={`/products/${item}`}>
      <Info>
        <Title>{item}</Title>
        <Button>SHOP NOW</Button>
      </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem
