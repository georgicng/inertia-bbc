<script setup>
import { storeToRefs } from 'pinia'
import { ref, watch, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useLoader } from '../composables/useLoader'
import { useCartStore } from '../stores/cart'
import {
  getCityList,
  getShippingList,
  getPaymentOptions,
  getCityShippingMapping
} from '../utils/helpers'
import Heading from '@/components/common/Heading.vue'
import Stepper from '@/components/common/Stepper.vue'
import User from '@/components/checkout/User.vue'
import Payment from '@/components/checkout/Payment.vue'
import Confirmation from '@/components/checkout/Confirmation.vue'
import Shipping from '@/components/checkout/Shipping.vue'

const title = 'Checkout'
const subtitle = 'Complete your order'
const orderStore = useCartStore()
const {
  user,
  delivery,
  cart,
  discount,
  subtotal,
  total,
  shippingRate,
  tos,
  payment,
  shipping,
  order,
  orderId,
  loadingConfig,
  config,
  quote,
  transaction
} = storeToRefs(orderStore)
const { addOrderId, fetchCheckoutConfig, submitOrder, completeTransaction } = orderStore

onBeforeMount(async () => await fetchCheckoutConfig())

const paymentOptions = ref([])
const shippingOptions = ref({})
const cityList = ref(['Other'])
const cityShippingMap = ref([])
watch(
  config,
  (newVal) => {
    if (!newVal) {
      return
    }
    const shippingList = getShippingList(newVal.shipping_method)
    const cityMap = getCityShippingMapping(shippingList?.home?.options)
    const cities = getCityList(newVal.shipping_method)
    const payments = getPaymentOptions(newVal.payment_methods)
    shippingOptions.value = shippingList
    cityShippingMap.value = cityMap
    cityList.value = cities
    paymentOptions.value = payments
  },
  { immediate: true }
)
useLoader(loadingConfig)

const timeOptions = computed(
  () => [
    {
      value: '11-1 PM',
      label: '11AM - 1PM'
    },
    {
      value: '1-3 PM',
      label: '1-3 PM'
    },
    ...(shipping.value?.type === 'partner'
      ? [
          {
            value: '3-5 PM',
            label: '3-5 PM'
          }
        ]
      : [])
  ],
  [shipping]
)

const invalid = ref(false)
const disabled = ref(false)
const userRef = ref(null)
const router = useRouter()

const steps = computed(() => [
  {
    title: 'User Details',
    icon: 'fa fa-user',
    key: 'user',
    component: User,
    props: {
      ref: userRef.value,
      user: user.value,
      cityList: cityList.value
    },
    events: {
      user($event) {
        user.value = $event
      }
    },
    validate() {
      return true //userRef.value.validate()
    }
  },
  {
    title: 'Delivery Details',
    icon: 'fa fa-truck',
    key: 'shipping',
    component: Shipping,
    props: {
      showErrors: invalid.value,
      shippingRate: shippingRate.value,
      delivery: delivery.value,
      timeOptions: timeOptions.value,
      payment: payment.value,
      paymentOptions: paymentOptions.value,
      user: user.value,
      shipping: shipping.value,
      shippingOptions: shippingOptions.value,
      cityShippingMap: cityShippingMap.value
    },
    events: {
      shipping($event) {
        shipping.value = $event
      },
      payment($event) {
        payment.value = $event
      },
      delivery($event) {
        delivery.value = $event
      },
      express() {
        shipping.value = {
          ...shipping.value,
          express: shipping.value.express ? 0 : 1000,
        }
      },
    },
    validate() {
      return delivery.value?.date && delivery.value?.time && shipping.value?.id && payment.value
    }
  },
  {
    title: 'Confirm Order',
    icon: 'fa fa-check',
    key: 'confirm',
    component: Confirmation,
    props: {
      tos: tos.value,
      cart: cart.value,
      discount: discount.value,
      subtotal: subtotal.value,
      total: total.value,
      shippingRate: shippingRate.value,
      showError: invalid.value
    },
    events: {
      tos($event) {
        tos.value = $event
      }
    },
    validate() {
      return tos.value
    },
    hooks: {
      post: async () => {
        disabled.value = true
        await submitOrder(order.value)
        quote.value?.order_id && addOrderId(quote.value.order_id)
        disabled.value = false
      }
    }
  },
  {
    title: 'Complete Order',
    icon: 'fa fa-credit-card',
    key: 'pay',
    component: Payment,
    props: {
      payment: payment.value,
      meta: paymentOptions.value[payment]?.meta
    },
    events: {},
    validate() {
      return true
    },
    hooks: {
      post: async () => {
        if (payment === 'transfer') {
          disabled.value = true
          const payload = {
            order: orderId.value,
            payment: 'Transfer',
            confirm: true
          }
          await completeTransaction(payload)
          disabled.value = false
          router.push('/success')
        }
      }
    }
  }
])

const activeStep = ref(1)
const lastStep = computed(() => activeStep.value === steps.value.length)
const firstStep = computed(() => activeStep.value === 1)
const navigateTo = async (to) => {
  const step = steps.value[activeStep.value - 1]

  const prev = to < activeStep.value
  if (prev) {
    if (step?.hooks?.pre) {
      await step.hooks.pre()
    }
    activeStep.value = to
    return
  }

  const valid = step.validate()
  if (!valid) {
    invalid.value = true
    return
  }
  invalid.value = false
  if (step?.hooks?.post) {
    await step.hooks.post()
  }
  if (to < steps.value.length) {
    activeStep.value = to
  }
}
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div class="container-fluid">
      <Heading :title="title" :subtitle="subtitle" />
      <div id="checkout-page" class="no-back">
        <div class="row">
          <div class="col-sm-12 offset-lg-2 col-lg-8">
            <Stepper :steps="steps" :stepIndex="activeStep - 1">
              <template #action>
                <div
                  :class="`d-flex ${firstStep ? 'justify-content-end' : 'justify-content-between'}`"
                  style="
                     {
                      padding: '0 20px';
                    }
                  "
                >
                  <button
                    v-if="!firstStep"
                    class="btn"
                    :disabled="disabled"
                    @click="() => navigateTo(activeStep - 1)"
                  >
                    Previous
                  </button>
                  <button
                    class="btn"
                    :disabled="disabled"
                    @click="() => navigateTo(activeStep + 1)"
                  >
                    {{ lastStep ? 'Finish' : 'Next' }}
                  </button>
                </div>
              </template>
            </Stepper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
