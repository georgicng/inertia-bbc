import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategories, getProducts, getProduct } from '../services/product.service'
import { PAGE_SIZE, DEPTH_SIZE } from '../utils/config'

const depth = DEPTH_SIZE
const limit = PAGE_SIZE

export const useProductStore = defineStore('product', () => {
  const loadingCategories = ref(false)
  const categoriesError = ref(null)
  const categories = ref([])
  async function fetchCategories(payload) {
    try {
      loadingCategories.value = true
      const res = await getCategories({ depth: payload?.depth || 1 })
      categories.value = res.data.data
    } catch (e) {
      categoriesError.value = e
    } finally {
      loadingCategories.value = false
    }
  }

  const loadingProducts = ref(false)
  const productsError = ref(null)
  const products = ref([])
  async function fetchProducts({ page = 1, category = 0 }) {
    const offset = (page - 1) * limit
    const params = {
      depth,
      limit,
      offset,
      ...(category > 0
        ? { 'filters[categories.id][eq]': category }
        : { 'filters[name][neq]': 'custom' })
    }
    try {
      loadingProducts.value = true
      const res = await getProducts(params)
      products.value = res.data.data
      // TODO: extract pagination
    } catch (e) {
      productsError.value = e
    } finally {
      loadingProducts.value = false
    }
  }

  const loadingProduct = ref(false)
  const productError = ref(null)
  const product = ref(null)
  async function fetchProduct(id) {
    try {
      loadingProduct.value = true
      const res = await getProduct(id, { depth })
      product.value = res.data.data
    } catch (e) {
      productError.value = e
    } finally {
      loadingProduct.value = false
    }
  }

  return {
    loadingCategories,
    categoriesError,
    categories,
    fetchCategories,
    loadingProducts,
    productsError,
    products,
    fetchProducts,
    loadingProduct,
    productError,
    product,
    fetchProduct
  }
})
