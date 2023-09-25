import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAEnquiry, getEnquiries, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: "Enquiry Details",
    render: (record) => (
      <React.Fragment>
        <span className='fw-bold'>No</span> : {record.key}
        <br />
        <span className='fw-bold'>Name</span> : {record.name}
        <br />
        <span className='fw-bold'>Email</span> : {record.email}
        <br />
        <span className='fw-bold'>Mobile</span> : {record.mobile}
        <br />
        <br />
        {record.status}
        <br />
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
    title: 'Email',
    dataIndex: 'email',
    responsive: ["sm"]
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    responsive: ["sm"]
  },
  {
    title: 'Status',
    dataIndex: 'status',
    responsive: ["sm"]
  },
  {
    title: 'Action',
    dataIndex: 'action',
    responsive: ["sm"]
  },
];

const Enquiries = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [enqId, setenqId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setenqId(e)
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState())
    dispatch(getEnquiries())
  }, [])
  const enqState = useSelector((state) => state.enquiry.enquiries)
  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i + 1,
      name: enqState[i].name,
      email: enqState[i].email,
      mobile: enqState[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={enqState[i].status ? enqState[i].status : "Submitted"}
            className='form-control form-select'
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link className='ms-3 fs-3' to={`/admin/enquiries/${enqState[i]._id}`}>
            <AiOutlineEye className='text-warning' />
          </Link>
          <button
            className='ms-3 fs-3 text-danger bg-transparent border-0'
            onClick={() => showModal(enqState[i]._id)} >
            <AiFillDelete />
          </button>
        </>
      )
    });
  }

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e }
    dispatch(updateAEnquiry(data))
  }

  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e))
    setOpen(false)
    setTimeout(() => {
      dispatch(getEnquiries())
    }, 100)
  }

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteEnq(enqId) }}
        title="Are you sure to delete this enquiry ?"
      />
    </div>
  )
}

export default Enquiries