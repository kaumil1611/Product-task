import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { CSVLink } from "react-csv";
const Productspage = () => {
  const [products, setproducts] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        getUserData(json);
        setDisplayProduct(json);
      });
  }, []);

  const getUserData = (data) => {
    const listData = [];
    data?.map((item) => {
      return listData.push(
        <>
          <tr>
            <td>{item?.id}</td>
            <td>{item?.title}</td>
            <td>{item?.price}</td>
            <td>{item?.category}</td>
            <td>{item?.description}</td>
            <td>
              <img
                src={item?.image}
                className="img-thumbnail"
                alt={item?.title}
              />
            </td>
          </tr>
        </>
      );
    });
    setproducts(listData);
  };
  const headers = [
    {
      label: "Id",
      key: "id",
    },
    { label: "Title", key: "title" },
    { label: "Price", key: "price" },
    { label: "Category", key: "category" },
    { label: "Description", key: "description" },
    { label: "Image", key: "image" },
  ];

  const csvLink = {
    filename: "products.csv",
    headers: headers,
    data: displayProduct,
  };

  return (
    <>
      <CSVLink {...csvLink}>Export to CSV</CSVLink>
      <Table striped bordered hover className="form-control">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </Table>
    </>
  );
};

export default Productspage;
