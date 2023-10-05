import styled from "styled-components";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { mobile } from "../Responsive";

const Container = styled.footer`
display: flex;

${mobile({flexDirection:"column"})};
`
const Left = styled.div`
flex:1;
display: flex;
flex-direction:column;
padding: 20px;
`
const Desc = styled.p`
margin:20px 0;
`
const SocialContainer = styled.div`
display: flex;
gap: 20px;
`
const SocialIcon = styled.div`
width: 40px;
height: 40px;
border-radius:50%;
color:#fff;
background-color: #${props=>props.color};
display: flex;
align-items: center;
justify-content: center;
`
const Logo = styled.h1`

`
const Center = styled.div`
flex:1;
padding: 20px;

${mobile({display:"none"})};
`
const Title = styled.h3`
margin-bottom:30px;
`
const List = styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-wrap:wrap;
`
const ListItem = styled.li`
width: 50%;
margin-bottom:10px;
`

const Right = styled.div`
flex:1;
padding: 20px;

${mobile({backgroundColor:"#eee"})};
`
const ContactItem = styled.div`
margin-bottom:20px;
display: flex;
align-items: center;
gap: 10px;
`
const Payment = styled.img`
width: 50%;
`




const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>RIYAD</Logo>
        <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, reprehenderit enim. Ut quas pariatur atque dicta magni excepturi, molestiae sapiente aspernatur quae. Provident nesciunt natus tenetur quaerat illo itaque voluptates.</Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color="E60023">
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
      <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <RoomIcon/> 622 Dixie Path , South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <LocalPhoneIcon/> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutlineIcon /> contact@lama.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  )
}

export default Footer
