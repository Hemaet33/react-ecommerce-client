import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {publicRequest} from '../requestMethods'
import { useParams } from 'react-router-dom';
import { mobile } from '../Responsive';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartRedux';

const Container = styled.div``;
const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({padding:"10px",flexDirection:"column"})};
`;
const ImgContainer = styled.div`
flex:1;
`;
const Image = styled.img`
width: 100%;
height: 90vh;
object-fit:cover;
${mobile({height:"40vh"})};
`;
const InfoContainer = styled.div`
flex:1;
padding: 0 50px;
${mobile({padding:"10px"})};
`;
const Title = styled.h1`
font-weight: 200;
`;
const Desc = styled.p`
margin: 20px 0;
`;
const Price = styled.span`
font-weight: 1;
font-size: 40px;
`;

const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
width:50%;
margin: 30px 0;
${mobile({width:"100%"})};
`;
const Filter = styled.div`
display: flex;
align-items: center;
`;
const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`;
const FilterColor = styled.span`
width: 20px;
height: 20px;
border-radius:50%;
border:1px solid #000;
background-color: ${props=>props.color};
margin-left: 10px;
cursor:pointer;
`;
const FilterSize = styled.select`
margin-left:10px;
padding: 10px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
display: flex;
align-items: center;
justify-content:space-between;
width: 50%;
${mobile({width:"100%"})};
`;
const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight: 700;
`;
const Amount = styled.span`
width: 30px;
height: 30px;
border-radius:10px;
border:1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin: 0 5px;
`;
const Button = styled.button`
padding: 15px;
border:2px solid teal;
background-color: #fff;
font-weight: 500;
cursor: pointer;
transition: all .3s ease;

&:hover{
border:2px solid #fff;
background-color: teal;
color:#fff;
}
`;

const Product = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(()=>{
    const getProduct = async()=>{
      const res = await publicRequest.get(`/products/find/${id}`);
      setProduct(res.data);
    }
    getProduct();
  },[id]);

  const changeQuantity=(type)=>{
    if(type==="dec"){
      quantity>1 && setQuantity(quantity-1)
    }else{
      setQuantity(quantity+1)
    }
  }

  const handleClick = ()=>{
    dispatch(addProduct({...product, quantity}));
  }
  
  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
        <FilterContainer>
          <Filter>
            <FilterTitle>Color</FilterTitle>
            {product.color?.map(c=>(
              <FilterColor color={c} key={c}/>
            ))}
          </Filter>
          <Filter>
            <FilterTitle>Size</FilterTitle>
            <FilterSize>
            {product.size?.map(s=>(
              <FilterSizeOption key={s}>{s}</FilterSizeOption>
            ))}
            </FilterSize>
          </Filter>
        </FilterContainer>
        <AddContainer>
          <AmountContainer>
            <RemoveIcon style={{cursor:"pointer"}} onClick={()=>changeQuantity("dec")} /> 
            <Amount>{quantity}</Amount>
            <AddIcon style={{cursor:"pointer"}} onClick={()=>changeQuantity("inc")} /> 
          </AmountContainer>
          <Button onClick={handleClick}>ADD TO CART</Button>
        </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product
