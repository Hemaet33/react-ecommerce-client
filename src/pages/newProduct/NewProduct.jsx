import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

import "./newProduct.css";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title:"",
    desc:"",
    price:0,
    inStock:"true",
  });
  const [img, setImg] = useState(null);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);


  const handleChange=(e)=>{
    setInputs(prev=>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }
  const handleCat=(e)=>{
    setCat(e.target.value.split(","))
  }
  const handleColor=(e)=>{
    setColor(e.target.value.split(","))
  }
  const handleSize=(e)=>{
    setSize(e.target.value.split(","))
  }

  const handleClick=(e)=>{
    e.preventDefault();
    const imgName = new Date().getTime() + img.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, imgName);
    const uploadTask = uploadBytesResumable(storageRef, img);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const product = {...inputs, img:downloadURL,categories:cat,color:color,size:size};
      addProduct(dispatch, product);
    });
  }
);
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e=>setImg(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" placeholder="Apple Airpods" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" name="desc" placeholder="Description..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" name="price" placeholder="$100" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans, skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Colors</label>
          <input type="text" placeholder="pink, red" onChange={handleColor} />
        </div>
        <div className="addProductItem">
          <label>Sizes</label>
          <input type="text" placeholder="m, l" onChange={handleSize} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
