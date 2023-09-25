import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

// Get Product Categories
const getProductCategories = async () => {
    const response = await axios.get(`${base_url}category/`)
    return response.data
}

// Create Product Category
const createCategory = async (category) => {
    const response = await axios.post(`${base_url}category/`, category, config)
    return response.data
}

// Get Product Category
const getProductCategory = async (id) => {
    const response = await axios.get(`${base_url}category/${id}`, config)
    return response.data
}

// Delete Product Category
const deleteProductCategory = async (id) => {
    const response = await axios.delete(`${base_url}category/${id}`, config)
    return response.data
}

// Update Product Category
const updateProductCategory = async (category) => {
    const response = await axios.put(
        `${base_url}category/${category.id}`,
        { title: category.pCatData.title },
        config
    )

    return response.data
}

const pcategoryService = {
    getProductCategories,
    createCategory,
    getProductCategory,
    deleteProductCategory,
    updateProductCategory
}
export default pcategoryService