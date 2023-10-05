import { Link, useParams } from "react-router-dom";
import "./adminproduct.css";
import Chart from "../../components/chart/Chart"
import PublishIcon from '@mui/icons-material/Publish';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {userRequest} from '../../requestMethods'
import { updateProduct } from "../../redux/apiCalls";

const AdminProduct = ()=>{
    const productId = useParams().productId;
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.products.find(product=>product._id===productId))
    const [stats, setStats]=useState([]);
    const [color, setColor]=useState([]);
    const [cat, setCat]=useState([]);
    const [size, setSize]=useState([]);
    const [updated, setUpdated]=useState({
      title:product.title,
      desc:product.desc,
      price:product.price,
      inStock:product.inStock,
    });

    const MONTHS = useMemo(()=>[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],[]);

  const handleChange=(e)=>{
    setUpdated(prev=>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  const handleColor=(e)=>{
    setColor(e.target.value.split(","))
  }
  

  const handleCat=(e)=>{
    setCat(e.target.value.split(","))
  }
  
  const handleSize=(e)=>{
    setSize(e.target.value.split(","))
  }
  
  const handleUpdate=async(e)=>{
    e.preventDefault();
    const res = await userRequest.patch(`/products/${productId}`,{...updated,size,color,cat});
    updateProduct(dispatch,productId,res.data)
  }

  useEffect(()=>{
    const getStats = async()=>{
      try {
        const res = await userRequest.get('orders/income?pid='+productId);
        res.data.map(item=>{
          setStats(prev=>[
          ...prev,
          {name:MONTHS[item._id - 1], Sales:item.total}
          ])
        })
      } catch (error) {
        console.log(error);
      }
    }
    getStats();
  },[MONTHS, productId]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={stats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" name="title" onChange={handleChange} placeholder={product.title} />
                  <label>Product Description</label>
                  <input type="text" name="desc" onChange={handleChange} placeholder={product.desc} />
                  <label>Product Price</label>
                  <input type="number" name="price" onChange={handleChange} placeholder={product.price} />
                  <label>Product Color</label>
                  <input type="text" name="color" onChange={handleColor} placeholder={product.color} />
                  <label>Product Categories</label>
                  <input type="text" name="categories" onChange={handleCat} placeholder={product.categories} />
                  <label>Product Sizes</label>
                  <input type="text" name="size" onChange={handleSize} placeholder={product.size} />
                  <label>In Stock</label>
                  <select onChange={handleChange} name="inStock" id="idStock">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                      <label htmlFor="file">
                          <PublishIcon/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button onClick={handleUpdate} className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}

export default AdminProduct;
