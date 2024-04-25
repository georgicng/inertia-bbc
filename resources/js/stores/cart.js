import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  addOrder,
  getCouponValue,
  confirmOrder,
  getCheckoutOptions
} from '../services/order.service'

export const useCartStore = defineStore('cart', () => {


  const orderId = ref(null)
  const setOrderId = (payload) => {
    orderId.value = payload
  }

  const discount = ref(0)
  const setDiscount = (payload) => {
    discount.value = payload
  }

  const tos = ref(false)
  const acceptTerms = (payload) => {
    tos.value = payload
  }

  const tax = ref(0)

  const cart = ref([])
  function addItem(payload) {
    cart.value.push(payload)
  }
  function deleteItem(payload) {
    cart.value.splice(payload, 1)
  }
  const changeQuantity = ({ index, quantity }) => {
    cart.value[index].quantity = quantity
  }
  function cartAction(action, value) {
    switch (action) {
      case 'add':
        addItem(value)
        break
      case 'delete':
        deleteItem(value)
        break
      case 'update':
        changeQuantity(value)
    }
  }

  const shipping = ref({ type: '', id: '', rate: 0, express: 0 })
  const shippingRate = computed(
    () => parseFloat(shipping.value?.rate || 0) + parseFloat(shipping.value?.express || 0)
  )
  function setShipping(payload) {
    shipping.value = payload
  }

  const user = ref({})
  function setUser(payload) {
    user.value = payload
  }

  const payment = ref({})
  function setPayment(payload) {
    payment.value = payload
  }

  const coupon = ref('')
  function setCoupon(payload) {
    coupon.value = payload
  }

  const delivery = ref({})
  function setDelivery(payload) {
    delivery.value = payload
  }

  const subtotal = computed(() =>
    cart.value.reduce((acc, item) => {
      return (acc += parseFloat(item.price) * parseInt(item.quantity))
    }, 0)
  )

  const total = computed(
    () => parseFloat(subtotal.value) + parseFloat(tax.value) + parseFloat(shippingRate.value) - parseFloat(discount.value)
  )

  const order = computed(() => {
    const items = cart.value.map((item) => {
      const line = {
        productid: item.line.id,
        quantity: item.quantity,
        price: item.price
      }
      if (item.options) {
        line.options = item.options
      }
      return line
    })
    const order = {
      cart: items,
      shipping: shipping.value.id,
      payment: payment,
      delivery_date: new Date(delivery.value.date).toLocaleDateString('en-NG'),
      delivery_time: delivery.value.time,
      express: !!shipping.value?.express
    }

    if (orderId.value && orderId.value > 0) {
      order.id = orderId
    }

    if (coupon.value) {
      order.coupon = coupon.value
    }

    return order
  })

  const loadingCoupon = ref(false)
  const couponError = ref(null)
  const couponValue = ref(0)
  async function fetchCouponValue(coupon) {
    try {
      loadingCoupon.value = true
      const res = await getCouponValue({
        single: 1,
        'filters[code][eq]': coupon
      })
      couponValue.value = res.data
    } catch (e) {
      couponError.value = e
    } finally {
      loadingCoupon.value = false
    }
  }

  const loadingConfig = ref(false)
  const configError = ref(null)
  const config = ref(null)
  async function fetchCheckoutConfig() {
    try {
      loadingConfig.value = true
      const res = await getCheckoutOptions()
      console.log({ config: res.data })
      config.value = res.data
    } catch (e) {
      configError.value = e
    } finally {
      loadingConfig.value = false
    }
  }

  const processingQuote = ref(false)
  const quoteError = ref(null)
  const quote = ref(null)
  async function submitOrder(payload) {
    try {
      processingQuote.value = true
      const res = await addOrder(payload)
      quote.value = res.data
    } catch (e) {
      console.error(e)
      quoteError.value = e
    } finally {
      processingQuote.value = false
    }
  }

  const processingTransaction = ref(false)
  const transactionError = ref(null)
  const transaction = ref(null)
  async function completeTransaction(payload) {
    try {
      processingTransaction.value = true
      const res = await confirmOrder(payload)
      transaction.value = res.data
    } catch (e) {
      console.error(e)
      transactionError.value = e
    } finally {
      processingTransaction.value = false
    }
  }

  return {
    delivery,
    user,
    tos,
    payment,
    shipping,
    cart,
    discount,
    orderId,
    tax,
    subtotal,
    total,
    shippingRate,
    coupon,
    order,
    quote,
    setOrderId,
    config,
    transaction,
    loadingConfig,
    setCoupon,
    setDelivery,
    setDiscount,
    setPayment,
    setShipping,
    setUser,
    cartAction,
    acceptTerms,
    fetchCouponValue,
    fetchCheckoutConfig,
    submitOrder,
    processingTransaction,
    completeTransaction,
    transactionError,
  }
})
