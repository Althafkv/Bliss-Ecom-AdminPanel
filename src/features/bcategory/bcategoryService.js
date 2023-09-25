import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

// Get Blog Categories
const getBlogCategories = async () => {
    const response = await axios.get(`${base_url}blogcategory/`)
    return response.data
}

// Create Blog Categories
const createBlogCategory = async (bcat) => {
    const response = await axios.post(`${base_url}blogcategory/`, bcat, config)
    return response.data
}

// Update Blog Categories
const updateBlogCategory = async (blogCat) => {
    const response = await axios.put(`${base_url}blogcategory/${blogCat.id}`, { title: blogCat.blogCatData.title }, config)
    return response.data
}

// Get Blog Categories
const getBlogCategory = async (id) => {
    const response = await axios.get(`${base_url}blogcategory/${id}`, config)
    return response.data
}

// Delete Blog categories
const deleteBlogCategory = async (id) => {
    const response = await axios.delete(`${base_url}blogcategory/${id}`, config)
    return response.data
}

const bcategoryService = {
    getBlogCategories,
    createBlogCategory,
    getBlogCategory,
    deleteBlogCategory,
    updateBlogCategory
}
export default bcategoryService