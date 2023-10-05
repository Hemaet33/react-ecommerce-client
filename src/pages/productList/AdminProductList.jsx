import "./adminproductList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";



export default function AdminProductList() {
  const [num, setnum]=useState(Math.random());
  const products = useSelector(state => state.product.products);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    deleteProduct(dispatch,id);
  };

  useEffect(()=>{
    getProducts(dispatch);
  },[dispatch])

  // console.log({rows});
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
    <div className="add">
          <Link to="/admin/newproduct">
          <button className="productAddButton">Create a product</button>
        </Link>
          </div>
      {products && <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={row=>row!==null && row._id}
        pageSize={8}
        checkboxSelection
      />}
    </div>
  );
}
