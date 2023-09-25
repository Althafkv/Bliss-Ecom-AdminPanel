import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { deleteABlog, getBlogs, resetState } from '../features/blogs/blogSlice';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: "Blog Details",
    render: (record) => (
      <React.Fragment>
        <span className='fw-bold'>No</span> : {record.key}
        <br />
        <span className='fw-bold'>Title</span> : {record.name}
        <br />
        <span className='fw-bold'>Category</span> : {record.category}
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
    title: 'Title',
    dataIndex: 'name',
    responsive: ["sm"]
  },
  {
    title: 'Category',
    dataIndex: 'category',
    responsive: ["sm"]
  },
  {
    title: 'Action',
    dataIndex: 'action',
    responsive: ["sm"]
  },
];


const Bloglist = () => {
  const [open, setOpen] = useState(false)
  const [blogId, setblogId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setblogId(e)
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetState())
    dispatch(getBlogs())
  }, [])
  const getBlogState = useSelector((state) => state.blogs.blogs)
  const data1 = [];
  for (let i = 0; i < getBlogState.length; i++) {
    data1.push({
      key: i + 1,
      name: getBlogState[i].title,
      category: getBlogState[i].category,
      action: (
        <>
          <Link to={`/admin/blog/${getBlogState[i].id}`} className='fs-3'>
            <BiEdit className='text-primary' />
          </Link>
          <button
            className='ms-3 fs-3 text-danger bg-transparent border-0'
            onClick={() => showModal(getBlogState[i]._id)} >
            <AiFillDelete />
          </button>
        </>
      )
    });
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e))
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs())
    }, 100)
  }

  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteBlog(blogId) }}
        title="Are you sure to delete this blog ?"
      />
    </div>
  )
}

export default Bloglist