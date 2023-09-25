import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineBgColors } from 'react-icons/ai'
import { RiCouponLine, RiBox3Fill } from 'react-icons/ri'
import { GoListUnordered } from 'react-icons/go'
import { TbBrandSentry } from 'react-icons/tb'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { BiCategoryAlt, BiCommentDetail, BiLogOut } from 'react-icons/bi'
import { BsFillFileEarmarkPostFill } from 'react-icons/bs'
import { ImBlog } from 'react-icons/im'
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className='text-white fs-5 text-center py-3 mb-0'>
            <span className='sm-logo'><RiBox3Fill className='fs-3' /></span>
            <span className='lg-logo align-items-center'><RiBox3Fill className='me-1 fs-3' />Venture Bliss</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {
              localStorage.clear()
              window.location.reload()
            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <MdOutlineDashboardCustomize className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'Catelog',
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: 'Catelog',
              children: [
                {
                  key: 'product',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'list-product',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <TbBrandSentry className='fs-4' />,
                  label: 'Brand',
                },
                {
                  key: 'list-brand',
                  icon: <TbBrandSentry className='fs-4' />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Category',
                },
                {
                  key: 'list-category',
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color',
                },
                {
                  key: 'list-color',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color List',
                },
              ]
            },
            {
              key: 'orders',
              icon: <GoListUnordered className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'marketing',
              icon: <RiCouponLine className='fs-4' />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCouponLine className='fs-4' />,
                  label: 'Coupon List',
                },
              ]
            },
            {
              key: 'blogs',
              icon: <BsFillFileEarmarkPostFill className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <BsFillFileEarmarkPostFill className='fs-4' />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <BsFillFileEarmarkPostFill className='fs-4' />,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <BiCommentDetail className='fs-4' />,
              label: 'Enquiries',
            },
            {
              key: 'signout',
              icon: <BiLogOut className='fs-4 text-danger' />,
              label: 'Logout',
            },
          ]}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='d-flex justify-content-between ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className='d-flex gap-4 align-items-center'>
            <div className='d-flex gap-3 align-items-center dropdown' >
              <div>
              </div>
              <div role='button' aria-expanded='false'>
                <h5 className='mb-0 fw-bold'>Admin</h5>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;