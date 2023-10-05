import styled from 'styled-components'
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useState } from 'react';
import { sliderItems } from '../data';
import { mobile } from '../Responsive';




const Container = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  position: relative;
  overflow:hidden;
  ${mobile({display:"none"})};
`

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-radius:50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color:#fff;
  position: absolute;
  top:0;
  bottom: 0;
  left:${props=>props.direction=="left" && "10px"};
  right:${props=>props.direction=="right" && "10px"};
  margin:auto;
  cursor: pointer;
  opacity:0.5;
  z-index:2;
`

const Wrapper = styled.div`
height: 100%;
display: flex;
transform:translateX(${(props)=>props.sliderindex * -100}vw);
transition: all 1.5s ease;
`

const Slide = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
background-color: ${props=>props.bg};
`

const ImgContainer = styled.div`
height: 100%;
flex:1;
`

const Image = styled.img`
height: 80%;
`

const InfoContainer = styled.div`
flex:1;
`

const Title = styled.h1`
font-size:70px;
text-transform:uppercase;
`

const Desc = styled.p`
margin:50px 0;
font-size:20px;
font-weight: 500;
letter-spacing:3px;
text-transform:uppercase;
`

const Button = styled.button`
padding: 10px;
font-size:20px;
background-color:transparent;
text-transform:uppercase;
`


const Slider = () => {
  const [slideIndex, setSlideIndex]=useState(0);

  const handleClick = (direction)=>{
     if(direction=="left"){
      setSlideIndex(slideIndex>0 ? slideIndex-1 : 2);
     }else{
      setSlideIndex(slideIndex<2 ? slideIndex+1 : 0);
    }
  }

  return (
    <Container>
      <Arrow direction="left" onClick={()=>handleClick("left")} style={slideIndex > 0 ? {display:"flex"} : {display:"none"}}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper sliderindex={slideIndex}>
      {sliderItems.map(item=>(
        <Slide bg={item.bg} key={item.id}>
          <ImgContainer>
            <Image src={item.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
            <Button>SHOP NOW</Button>
          </InfoContainer>
        </Slide>
      ))}
      </Wrapper>
      <Arrow direction="right" onClick={()=>handleClick("right")} style={slideIndex < 2 ? {display:"flex"} : {display:"none"}}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  )
}

export default Slider
