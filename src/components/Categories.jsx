import styled from "styled-components"
import { categories } from "../data"
import CategoryItem from "./CategoryItem"
import { mobile } from "../Responsive"
import { useEffect, useState } from "react"
import { publicRequest } from "../requestMethods"

const Container = styled.div`
display: flex;
gap:10px;
padding: 20px;
justify-content:space-between;
${mobile({padding:"0", flexDirection:"column"})};
`

const Categories = () => {
  const [products, setProducts] = useState([])

  let cats=[];

  useEffect(()=>{
    const getProducts = async()=>{
      try {
        const res = await publicRequest.get('/products');
        setProducts(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getProducts()
  },[])

    products.map(product=>{
      product.categories.map(cat=>{
        cats.push(cat);
      })
    })
  return (
    <Container>
      {cats.map(item=>(
        <CategoryItem item={item} key={item} />
      ))}
    </Container>
  )
}

export default Categories
