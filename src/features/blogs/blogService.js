import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

// Get Blogs
const getBlogs = async () => {
    const response = await axios.get(`${base_url}blog/`)
    return response.data
}

// Create Blog
const createBlog = async (blog) => {
    const response = await axios.post(`${base_url}blog/`, blog, config)
    return response.data
}

// Update Blog
const updateBlog = async (blog) => {
    const response = await axios.put(`${base_url}blog/${blog.id}`, { title: blog.blogData.title, description: blog.blogData.description, category: blog.blogData.category, images: blog.blogData.images }, config)
    return response.data
}

// Get Blog
const getBlog = async (id) => {
    const response = await axios.get(`${base_url}blog/${id}`, config)
    return response.data
}

// Delete Blog
const deleteBlog = async (id) => {
    const response = await axios.delete(`${base_url}blog/${id}`, config)
    return response.data
}

const blogService = {
    getBlogs,
    createBlog,
    getBlog,
    deleteBlog,
    updateBlog
}
export default blogService