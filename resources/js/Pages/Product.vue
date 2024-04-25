<script setup>
import { storeToRefs } from 'pinia'
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoader } from '../composables/useLoader'
import { useProductStore } from '../stores/product'
import { useCartStore } from '../stores/cart'
import { OPTION_KEY_MAP, OPTION_TYPE_MAP } from '../utils/constants'
import { getOptions, getOptionIncrement, getOptionIncrementMap } from '../utils/helpers'
import Tabs from '../Components/common/Tabs.vue'
import ProductGallery from '../Components/product/ProductGallery.vue'
import ProductOptions from '../Components/product/ProductOptions.vue'
import Title from '../Components/common/Title.vue'

const transform = (model, key = 'id') =>
  Object.keys(model).reduce((acc, _key) => {
    let value = model[_key]

    if (Array.isArray(value)) {
      value = value.map((item) => item[key])
    } else if (typeof value === 'object') {
      value = value[key]
    }

    return { ...acc, [_key]: value }
  }, {})

//TODO: validation, imer
const route = useRoute()
const id = computed(() => route.params.id)
const productStore = useProductStore()
const { product, productLoading, productError } = storeToRefs(productStore)
const { fetchProduct } = productStore

const multi = false
const options = ref([])
const incrementMap = ref({})
const normalPrice = ref(0)
const quantity = ref(1)
const price = ref(0)
const model = ref({})
watch(
  id,
  async (newValue) => {
    if (!newValue) {
      return
    }
    await fetchProduct(newValue)
    const sortArray = Object.values(OPTION_KEY_MAP)
    const optionList = getOptions(product.value, OPTION_TYPE_MAP).sort(
      (a, b) => sortArray.indexOf(a.name) - sortArray.indexOf(b.name)
    )
    options.value = optionList
    model.value = optionList.reduce(
      (acc, option) => ({
        ...acc,
        [option.name]: option.type === OPTION_TYPE_MAP.CHECKBOX ? [] : ''
      }),
      {}
    )
    normalPrice.value = parseFloat(product.value.price)
    price.value = parseFloat(product.value.price)
    incrementMap.value = getOptionIncrementMap(product.value, OPTION_TYPE_MAP)
  },
  { immediate: true }
)
useLoader(productLoading)

const valid = ref(false)
const showError = ref(false)
const pristine = ref(true)
const errorBag = ref({})
const validate = (model) => {
  const _errorBag = {}
  options.value.forEach((option) => {
    if (option.required) {
      if (option.type === OPTION_TYPE_MAP.CHECKBOX && !model[option.name]?.length) {
        _errorBag[option.name] = [`${option.name} cannot be empty`]
      }

      if (option.type === OPTION_TYPE_MAP.SELECT && !model[option.name]) {
        _errorBag[option.name] = [`${option.name} is required`]
      }
    }

    if (option.maximum) {
      if (model[option.name]?.length > option.maximum) {
        _errorBag[option.name] = [
          ...(_errorBag[option.name] ? _errorBag[option.name] : []),
          `${option.name} exceeds ${option.maximum}`
        ]
      }
    }

    if (option.minimum) {
      if (model[option.name]?.length < option.minimum) {
        _errorBag[option.name] = [
          ...(_errorBag[option.name] ? _errorBag[option.name] : []),
          `${option.name} is lesser than ${option.minimum}`
        ]
      }
    }
  })
  if (multi && !quantity.value) {
    _errorBag['quantity'] = `Please specify the quantity`
  }
  valid.value = !Object.keys(_errorBag).length
  errorBag.value = _errorBag
}

const calculateTotalIncrement = (model) => {
  return Object.keys(model).reduce((acc, key) => {
    const increment = getOptionIncrement(key, model[key], incrementMap, OPTION_KEY_MAP)
    return (acc += increment)
  }, 0)
}

const handleChange = (key, value) => {
  let newModel = null

  if (key === OPTION_KEY_MAP.QUANTITY) {
    quantity.value = value
  } else {
    newModel = {
      ...model.value,
      [key]: value
    }
  }

  if (newModel) model.value = newModel

  price.value =
    (calculateTotalIncrement(transform(newModel || model.value)) + normalPrice.value) *
    quantity.value

  validate(newModel || model.value)
  if (pristine.value) pristine.value = false
}

const { cartAction } = useCartStore()
const router = useRouter()
const addToCart = () => {
  if (!valid.value) {
    pristine.value && validate(model.value)
    showError.value = true
    return
  }
  cartAction('add', {
    line: product.value,
    options: transform(model.value, 'label'),
    quantity: quantity.value,
    price: price.value
  })
  router.push('/cart')
}
</script>

<template>
  <div v-if="product" id="menu-detail-page">
    <div class="container-fluid">
      <Title :name="product.name" :price="product.price" />

      <div class="no-back">
        <div class="row">
          <div class="col-sm-12 col-md-6 offset-lg-2 col-lg-4 mb-4">
            <ProductGallery :product="product" />
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div class="menu-info">
              <div class="form">
                <ProductOptions
                  :options="options"
                  :model="model"
                  :errors="errorBag"
                  :showError="showError"
                  @update:model="handleChange($event.key, $event.value)"
                />
                <div v-if="multi" class="form-group">
                  <div>
                    <label for="quantity" class="font-weight-bold"> Quantity : </label>
                    <input
                      type="text"
                      class="form-control"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max="100"
                      :value="quantity"
                      @change="handleChange('quantity', $event.target.value)"
                    />
                  </div>
                  <div v-if="showError && errorBag[OPTION_KEY_MAP.QUANTITY]" class="error d-flex">
                    {{ errorBag[OPTION_KEY_MAP.QUANTITY][0] }}
                  </div>
                </div>

                <div class="form-group">
                  <span class="font-weight-bold">Total:</span>
                  <span class="price">N{{ price }}</span>
                </div>
                <button @click="addToCart" class="btn btn-orange">
                  Add to cart
                  <span>
                    <i class="fa fa-shopping-cart"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Tabs :description="product.description" />
      </div>
    </div>
  </div>
</template>
