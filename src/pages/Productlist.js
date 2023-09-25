import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from '../features/product/productSlice';
const columns = [
  {
    title: "Product Details",
    render: (record) => (
      <React.Fragment>
        <span className='fw-bold'>No</span> : {record.key}
        <br />
        <span className='fw-bold'>Title</span> : {record.title}
        <br />
        <span className='fw-bold'>Brand</span> : {record.brand}
        <br />
        <span className='fw-bold'>Category</span> : {record.category}
        <br />
        <span className='fw-bold'>Color</span> : {record.color}
        <br />
        <span className='fw-bold'>Price</span> : {record.price}
        <br />
        <div className='text-center'>{record.action}</div>
      </React.Fragment>
    ),
    responsive: ["xs"]
  },
  {
    title: 'SNo',
    dataIndex: 'key',
    responsive: ["sm"]
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
    responsive: ["sm"]
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length,
    responsive: ["sm"]
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
    responsive: ["sm"]
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
    responsive: ["sm"]
  }
];

const Productlist = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
  }, [])
  const productState = useSelector((state) => state.product.products)
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      price: `${productState[i].price}`,
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Productlist