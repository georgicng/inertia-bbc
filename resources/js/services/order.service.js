import axios from '../utils/axios'
import { API_CUSTOM_PREFIX, API_ENDPOINT_PREFIX, API_ENDPOINT_SUFFIX } from '../utils/config'

const addOrder = (body) => axios.post(`${API_CUSTOM_PREFIX}/orders`, body)
const confirmOrder = ({ order, ...body }) =>
  axios.post(`${API_CUSTOM_PREFIX}/orders/${order}`, body)
const getCouponValue = (params) => axios.get(`coupons/${API_ENDPOINT_SUFFIX}`, params)
const getShippingMethods = () =>
  axios.get(`${API_ENDPOINT_PREFIX}/shipping_rates/${API_ENDPOINT_SUFFIX}`)
const getPaymentMethods = () =>
  axios.get(`${API_ENDPOINT_PREFIX}/payment_methods/${API_ENDPOINT_SUFFIX}`)
const getCheckoutOptions = () => axios.get(`${API_CUSTOM_PREFIX}/checkout_options`)

export {
  addOrder,
  getCouponValue,
  confirmOrder,
  getShippingMethods,
  getPaymentMethods,
  getCheckoutOptions
}
