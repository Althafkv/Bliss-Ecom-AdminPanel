import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { getOrders, updateAOrder } from '../features/auth/authSlice';

const columns = [
  {
    title: "Order Details",
    render: (record) => (
      <React.Fragment>
        <span className='fw-bold'>No</span> : {record.key}
        <br />
        <span className='fw-bold'>Name</span> : {record.name}
        <br />
        <span className='fw-bold'>Product</span> : {record.product}
        <br />
        <span className='fw-bold'>Amount</span> : {record.amount}
        <br />
        <span className='fw-bold'>Date</span> : {record.date}
        <br />
        <div className='text-center mt-3'>{record.action}</div>
      </React.Fragment>
    ),
    responsive: ["xs"]
  },
  {
    title: 'S No',
    dataIndex: 'key',
    responsive: ["sm"]
  },
  {
    title: 'Name',
    dataIndex: 'name',
    responsive: ["sm"]
  },
  {
    title: 'Product',
    dataIndex: 'product',
    responsive: ["sm"]
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    responsive: ["sm"]
  },
  {
    title: 'Date',
    dataIndex: 'date',
    responsive: ["sm"]
  },
  {
    title: 'Action',
    dataIndex: 'action',
    responsive: ["sm"]
  },
];

const Orders = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrders())
  }, [])
  const orderState = useSelector((state) => state.auth.orders.getorders)

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname,
      product: (
        <Link className='text-decoration-none' to={`/admin/order/${orderState[i]?._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select name="" defaultValue={orderState[i]?.orderStatus} onChange={(e) => updateOrderStatus(orderState[i]?._id, e.target.value)} className='form-control form-select' id="">
            <option value="Ordered" disabled selected>Ordered</option>

            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      )
    });
  }

  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b }))
  }

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        {<Table columns={columns} dataSource={data1} />}
      </div>
    </div>
  )
}

export default Orders