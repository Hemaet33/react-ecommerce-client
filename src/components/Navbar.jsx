import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';

import { mobile } from '../Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/apiCalls';

const Container = styled.div`
  height:60px;
  ${mobile({height:"50px"})}
`

const Wrapper = styled.div`
  padding:10px 20px;
  display:flex;
  justify-content:space-between;
  align-items: center;

  ${mobile({padding:"10px 0"})}
`
const Left = styled.div`
flex:1;
display: flex;
align-items: center;
`
const Center = styled.div`
flex:1;

&>a{
text-align: center;
text-decoration:none;
color:#000;
}
`
const Right = styled.div`
flex:1;
display: flex;
justify-content:flex-end;
${mobile({flex:2,justifyContent:"center"})}
`
const MenuItem = styled.div`
font-size:14px;
cursor:pointer;
margin-left: 25px;
${mobile({fontSize:"12px", marginLeft:"10px"})}
`

const Language = styled.span`
font-size:14px;
cursor: pointer;

${mobile({display:"none"})}
`
const SearchContainer = styled.div`
  border:0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`
const Input = styled.input`
border:none;

${mobile({width:"50px"})}

&:focus{
  outline:none;
} 
`
const Logo = styled.h1`
  font-weight:bold;
  ${mobile({fontSize:"24px"})}
`

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout=async()=>{
    await logout(dispatch)
    navigate('/login')
  }

  return (
    <>
      <Container>
        <Wrapper>
        <Left>
        <Language>EN</Language>
        <SearchContainer>
          <Input placeholder='Search' />
          <SearchIcon style={{color:"grey", fontSize:16}} />
        </SearchContainer>
        </Left>
        <Center><Link to="/"><Logo>Hemayet</Logo></Link></Center>
        <Right>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <Link to="/cart">
          <MenuItem>
          <Badge badgeContent={quantity} color="primary">
            <ShoppingCartOutlinedIcon />
          </Badge>
          </MenuItem>
        </Link>
        </Right>
        </Wrapper>
      </Container>
    </>
  )
}

export default Navbar
