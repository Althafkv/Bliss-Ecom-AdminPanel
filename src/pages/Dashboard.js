import React, { useEffect, useState } from 'react'
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getMonthlyData, getOrders, getYearlyData } from '../features/auth/authSlice';

const columns = [
  {
    title: "Customer Details",
    render: (record) => (
      <React.Fragment>
        <span className='fw-bold'>No</span> : {record.key}
        <br />
        <span className='fw-bold'>Name</span> : {record.name}
        <br />
        <span className='fw-bold'>Product Count</span> : {record.product}
        <br />
        <span className='fw-bold'>Total Price</span> : {record.price}
        <br />
        <span className='fw-bold'>Discount Price</span> : {record.dprice}
        <br />
        <span className='fw-bold'>Status</span> : {record.status}
      </React.Fragment>
    ),
    responsive: ["xs"]
  },
  {
    title: 'No',
    dataIndex: 'key',
    responsive: ["sm"]
  },
  {
    title: 'Name',
    dataIndex: 'name',
    responsive: ["sm"]
  },
  {
    title: 'Product Count',
    dataIndex: 'product',
    responsive: ["sm"]
  },
  {
    title: 'Total Price (₹)',
    dataIndex: 'price',
    responsive: ["sm"]
  },
  {
    title: 'Total Price After Discount (₹)',
    dataIndex: 'dprice',
    responsive: ["sm"]
  },
  {
    title: 'Status',
    dataIndex: 'status',
    responsive: ["sm"]
  },
];


const Dashboard = () => {

  const dispatch = useDispatch()
  const monthlyDataState = useSelector(state => state?.auth?.monthlyData)
  const yearlyDataState = useSelector(state => state?.auth?.yearlyData)
  const orderState = useSelector(state => state?.auth?.orders.getorders)
  const [dataMonthly, setDataMonthly] = useState([])
  const [dataMonthlySales, setDataMonthlySales] = useState([])
  const [orderData, setOrderData] = useState([])

  const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      Accept: "application/json"
    }
  }
  // console.log(orderState);
  useEffect(() => {
    dispatch(getMonthlyData(config3))
    dispatch(getYearlyData(config3))
    dispatch(getOrders(config3))
  }, [])

  useEffect(() => {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let data = []
    let monthlyOrderCount = []
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];

      data.push({ type: monthNames[element?._id?.month], income: element?.amount })
      monthlyOrderCount.push({ type: monthNames[element?._id?.month], sales: element?.count })

    }
    setDataMonthly(data)
    setDataMonthlySales(monthlyOrderCount)


    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i + 1,
        name: orderState[i].user.firstname + orderState[i].user.lastname,
        product: orderState[i].orderItems?.length,
        price: orderState[i]?.totalPrice,
        dprice: orderState[i]?.totalPriceAfterDiscount,
        status: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data1)


  }, [orderState])


  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    color: ({ type }) => {
      return "#44a6c6";
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  const config2 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return "#44a6c6";
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Sales',
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title fw-bold">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 shadow'>
          <div>
            <p className='desc'>Total Income</p> <h4 className='mb-0 sub-title'>₹ {yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
          <div>
            <p className='desc'>Total Sales</p> <h4 className='mb-0 sub-title'>{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
          </div>
        </div>

      </div>
      <div className='d-flex justify-content-between gap-3'>
        <div className="mt-5 flex-grow-1 w-50">
          <h3 className="mb-5 title text-center">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-5 flex-grow-1 w-50">
          <h3 className="mb-5 title text-center">Sales~ Statics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="mb-5 title text-center">
          Recent Orders
        </h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard