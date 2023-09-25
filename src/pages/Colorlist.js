import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { deleteAColor, getColors } from '../features/color/colorSlice';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: "Color Details",
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
    responsive: ["sm"]
  },
  {
    title: 'Action',
    dataIndex: 'action',
    responsive: ["sm"]
  },
];

const Colorlist = () => {
  const [open, setOpen] = useState(false)
  const [colorId, setcolorId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e)
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getColors())
  }, [])
  const colorState = useSelector((state) => state.color.colors)
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState[i].title,
      action: (
        <>
          <Link to={`/admin/color/${colorState[i]._id}`} className='fs-3'>
            <BiEdit className='text-primary' />
          </Link>
          <button
            className='ms-3 fs-3 text-danger bg-transparent border-0'
            onClick={() => showModal(colorState[i]._id)} >
            <AiFillDelete />
          </button>
        </>
      )
    });
  }
  const deleteColor = (e) => {
    dispatch(deleteAColor(e))
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors())
    }, 100)
  }
  return (
    <div>
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteColor(colorId) }}
        title="Are you sure to delete this color ?"
      />
    </div>
  )
}

export default Colorlist