import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { deleteAProductCategory, getCategories, resetState } from '../features/pcategory/pcategorySlice';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: "Product Category Details ",
    render: (record) => (
      <React.Fragment>
        <div className='text-center'>
          <span className='fw-bold'>No</span> : {record.key}
          <br />
          <span className='fw-bold'>Name</span> : {record.name}
        </div>
        <div className='text-center'>{record.action}</div>
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
    sorter: (a, b) => a.name.length - b.name.length,
    responsive: ["sm"]
  },
  {
    title: 'Action',
    dataIndex: 'action',
    responsive: ["sm"]
  },
];


const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e)
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetState())
    dispatch(getCategories())
  }, [])
  const pCatState = useSelector((state) => state.pCategory.pCategories)
  const data1 = [];
  for (let i = 0; i < pCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatState[i].title,
      action: (
        <>
          <Link to={`/admin/category/${pCatState[i]._id}`} className='fs-3'>
            <BiEdit className='text-primary' />
          </Link>
          <button
            className='ms-3 fs-3 text-danger bg-transparent border-0'
            onClick={() => showModal(pCatState[i]._id)} >
            <AiFillDelete />
          </button>
        </>
      )
    });
  }

  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e))
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories())
    }, 100)
  }

  return (
    <div>
      <h3 className="mb-4 title">Product Category</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteCategory(pCatId) }}
        title="Are you sure to delete this Product Category ?"
      />
    </div>
  )
}

export default Categorylist