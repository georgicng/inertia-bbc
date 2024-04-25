<script setup>
import { Link } from '@inertiajs/vue3'
import CartItems from '../cart/CartItems.vue'
import CartTotals from '../cart/CartTotals.vue'

defineProps({
  cart: { type: Object, required: true },
  total: { type: Object, required: true },
  discount: { type: Object, required: true },
  shippingRate: { type: Object, required: true },
  subtotal: { type: Object, required: true },
  tos: { type: Object, required: true },
  showError: { type: Object, required: true },
  onChange: { type: Object, required: true }
})
</script>

<template>
  <div class="innerpage-heading text-center">
    <h3>Confirm Order</h3>
    <p>We need to save your order</p>
  </div>
  <div class="order-list">
    <CartItems :cart="cart" :readonly="true" />
    <CartTotals :shipping="shippingRate" :discount="discount" :subtotal="subtotal" :total="total" />
  </div>
  <div class="custom-control custom-checkbox my-3">
    <input
      class="custom-control-input"
      type="checkbox"
      id="tos"
      :checked="tos"
      @change="$emit('tos', $event.target.value)"
    />
    <label class="custom-control-label" for="tos">
      <h4>
        I agree to" "
        <Link href="/terms" target="_blank"> Terms of Service </Link>
      </h4>
    </label>
    <div v-if="showError && !tos" class="error">
      You are required to agree to the terms and conditions
    </div>
  </div>
</template>
