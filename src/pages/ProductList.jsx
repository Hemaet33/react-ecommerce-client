import styled from 'styled-components';
import Products from '../components/Products';
import { mobile } from '../Responsive';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div``;
const Title = styled.h1`
margin: 20px;
text-transform:capitalize;
`;
const FilterContainer = styled.div`
display: flex;
justify-content:space-between;
`;
const Filter = styled.div`
margin: 20px;

${mobile({display:"flex",flexDirection:"column"})};
`;
const FilterText = styled.span`
font-size:20px;
font-weight: 600;
margin-right: 20px;

${mobile({marginRight:"0"})};
`;
const Select = styled.select`
padding: 10px;
margin-right: 20px;

${mobile({margin:"10px 0"})};
`;
const Option = styled.option`

`;

const ProductList = () => {
  const cat = useParams().category;
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e)=>{
    setFilters({
      ...filters,
      [e.target.name]:e.target.value
    });
  }

  return (
    <Container>
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
        <FilterText>Filter Products</FilterText>
        <Select name="color" onChange={handleFilters} >
            <Option>
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters} >
            <Option>
              Size
            </Option>
            <Option>xs</Option>
            <Option>s</Option>
            <Option>m</Option>
            <Option>l</Option>
            <Option>xl</Option>
          </Select>
        </Filter>
        <Filter><FilterText>Sort Products</FilterText>
        <Select onChange={e=>setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price(desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
    </Container>
  )
}

export default ProductList
