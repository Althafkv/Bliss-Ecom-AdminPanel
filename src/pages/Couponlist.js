import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { deleteACoupon, getAllCoupon, resetState } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';

const columns = [
    {
        title: "Coupon Details",
        render: (record) => (
            <React.Fragment>
                <span className='fw-bold'>No</span> : {record.key}
                <br />
                <span className='fw-bold'>Name</span> : {record.name}
                <br />
                <span className='fw-bold'>Discount</span> : {record.discount}
                <br />
                <span className='fw-bold'>Expiry</span> : {record.expiry}
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
        sorter: (a, b) => a.name.length - b.name.length,
        responsive: ["sm"]
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        sorter: (a, b) => a.discount - b.discount,
        responsive: ["sm"]
    },
    {
        title: 'Expiry',
        dataIndex: 'expiry',
        sorter: (a, b) => a.name.length - b.name.length,
        responsive: ["sm"]
    },
    {
        title: 'Action',
        dataIndex: 'action',
        responsive: ["sm"]
    },
];


const Couponlist = () => {
    const [open, setOpen] = useState(false);
    const [couponId, setcouponId] = useState("")
    const showModal = (e) => {
        setOpen(true);
        setcouponId(e)
    };

    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(resetState())
        dispatch(getAllCoupon())
    }, [])
    const couponState = useSelector((state) => state.coupon.coupons)
    const data1 = [];
    for (let i = 0; i < couponState.length; i++) {
        data1.push({
            key: i + 1,
            name: couponState[i].name,
            discount: couponState[i].discount,
            expiry: new Date(couponState[i].expiry).toLocaleString(),
            action: (
                <>
                    <Link to={`/admin/coupon/${couponState[i]._id}`} className='fs-3 text-danger'>
                        <BiEdit className='text-primary' />
                    </Link>
                    <button
                        className='ms-3 fs-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(couponState[i]._id)} >
                        <AiFillDelete />
                    </button>
                </>
            )
        });
    }
    const deleteCoupon = (e) => {
        dispatch(deleteACoupon(e))
        setOpen(false);
        setTimeout(() => {
            dispatch(getAllCoupon())
        }, 100)
    }
    return (
        <div>
            <h3 className="mb-4 title">Coupons</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => { deleteCoupon(couponId) }}
                title="Are you sure to delete this coupon ?"
            />
        </div>
    )
}

export default Couponlist