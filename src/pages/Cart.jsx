import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from '../Responsive';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Container = styled.div``;
const Wrapper = styled.div`
padding: 20px;
${mobile({padding:"10px"})};
`;
const Title = styled.h1`
font-weight: 300;
text-align: center;
`;
const Top = styled.div`
display: flex;
align-items: center;
justify-content:space-between;
padding: 20px;
`;
const TopButton = styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
background-color:${props=>props.type == "filled" ? "black" : "transparent"};
&>a{
  color:${props=>props.type == "filled" ? "white":"black"};
  text-decoration:none;
}

`;
const TopTexts = styled.div`
${mobile({display:"none"})};
`;
const TopText = styled.span`
text-decoration:underline;
cursor: pointer;
margin: 0 20px;
`;
const Buttons = styled.div`
display: flex;
justify-content:space-between;
${mobile({flexDirection:"column"})};
`;
const Info = styled.div`
flex:3;
`;

const Product = styled.div`
display: flex;
justify-content:space-between;
margin-bottom:20px;
${mobile({flexDirection:"column"})};
`;
const ProductDetail = styled.div`
flex:2;
display: flex;
`;
const Image = styled.img`
width: 200px;
height: 250px;
object-fit:cover;
`;
const Details = styled.div`
padding: 20px;
display: flex;
flex-direction:column;
justify-content:space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.span`
width: 20px;
height: 20px;
border-radius:50%;
border:1px solid #000;
background-color: ${props=>props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: center;
flex-direction:column;
`;
const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom:20px;
`;
const ProductAmount = styled.div`
font-size: 24px;
margin: 5px;
${mobile({margin:"0 20px"})};
`;
const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
${mobile({marginBottom:"20px"})};
`;
const Hr = styled.hr`
background-color:#eee;
border:none;
height: 1px;
`

const Summary = styled.div`
flex:1;
border:0.3px solid lightgray;
border-radius:10px;
height: 50v;
padding: 20px;
`;

const SummaryTitle = styled.h1`
font-weight: 200;
`;
const SummaryItem = styled.div`
margin: 10px 0;
display: flex;
justify-content:space-between;
font-weight:${props=>props.type == "total" && "500"};
font-size:${props=>props.type == "total" && "24px"};
`;
const SummaryItemText = styled.span`

`;
const SummaryItemPrice = styled.span`

`;
const Button = styled.button`
width: 100%;
font-weight: 600;
padding: 10px;
background-color:black;
margin-top:40px;

& > a{
text-decoration:none;
color:#fff;
}
`;



const Cart = () => {
  const cart = useSelector(state=>state.cart)
  console.log(cart);
  return (
    <Container>
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton type='white'><Link to="/">CONTINUE SHOPPING</Link></TopButton>
            <TopTexts>
              <TopText>Shopping Bag(2)</TopText>
              <TopText>Your Wishlist(0)</TopText>
            </TopTexts>
            <TopButton type="filled"><Link to={`/pay/${cart.total}`}>CHECKOUT NOW</Link></TopButton>
          </Top>
          <Buttons>
            <Info>
              {cart.products.map(product=>(
                <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />

                  <Details>
                    <ProductName><b>Produxt</b> {product.title}</ProductName>
                    <ProductId><b>ID</b>{product._id}</ProductId>
                    {product.color.map(c=>(

                    <ProductColor key={c} color={c} />
                    ))}
                    {product.size.map(s=>(
                      <ProductSize key={s}><b>Size</b>{s}</ProductSize>
                    ))}
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <RemoveIcon />
                  </ProductAmountContainer>
                  <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                </PriceDetail>
              </Product>
              ))}
              <Hr/>
            </Info>
            <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button><Link to={`/pay/${cart.total}`}>CHECKOUT NOW</Link></Button>
            </Summary>
          </Buttons>
        </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
