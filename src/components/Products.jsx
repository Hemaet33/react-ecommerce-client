import styled from "styled-components"
import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
display: flex;
gap:10px;
padding: 0 20px 20px;
flex-wrap:wrap;
justify-content:space-between;
`;
const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(()=>{
    const getProducts = async()=>{
      try {
        const res = await axios.get(cat ? `https://react-ecommerce-api-bwel.onrender.com/api/products?category=${cat}` : "https://react-ecommerce-api-bwel.onrender.com/api/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  },[cat]);

  useEffect(()=>{
    if(sort == "newest"){
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>a.createdAt - b.createdAt)
        )
    }else if(sort == "asc"){
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>a.price - b.price)
        )
    }else{
        setFilteredProducts(prev=>
          [...prev].sort((a,b)=> b.price - a.price)
          )
      
    }
  },[sort]);

  useEffect(()=>{
   cat && setFilteredProducts(
    products.filter(item=>
      Object.entries(filters).every(([key, value])=>
      item[key].includes(value)
      )
      )
   ); 
  },[cat, products, filters]);

  return (
    <Container>
      {cat ?
      filteredProducts.map(product=>(
        <Product key={product.id} product={product} />
      )) :
      products.slice(0,8).map(product=>(
        <Product key={product.id} product={product} />
      ))}
    </Container>
  )
}

export default Products
