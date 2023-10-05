import Search from "@mui/icons-material/Search";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from "styled-components";
import { Link } from "react-router-dom";


const Info = styled.div`
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
background-color: rgba(58,57,57,.25);
z-index:3;
display: flex;
align-items: center;
justify-content: center;
transition:all .5s ease;
cursor:pointer;
opacity:0;
`;

const Container = styled.div`
flex:1;
min-width:280px;
height: 350px;
display: flex;
align-items: center;
justify-content: center;
background-color: #f5fbfd;
position: relative;

&:hover ${Info}{
  opacity:1;
}
`;

const Circle = styled.div`
width: 200px;
height: 200px;
border-radius:50%;
background-color: #fff;
position: absolute;
`;

const Image = styled.img`
height: 75%;
z-index:2;
`;


const Icon = styled.div`
width: 40px;
height: 40px;
border-radius:50%;
background-color: #fff;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition:all .5s ease;

& > a{
  color:#000;
}

&:hover{
  transform:scale(1.3);
}
`;

const Product = ({product}) => {
  return (
    <Container>
      <Circle />
      <Image src={product.img}/>
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${product._id}`}>
          <Search />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderIcon />
        </Icon>
      </Info>
    </Container>
  )
}

export default Product
