<script setup>
import CartItem from "./CartItem.vue";
import { Link } from '@inertiajs/vue3'

defineProps({ cart: { type: Array, required: true } })
</script>

<template>
  <template v-if="!cart.length">
    <h1><i class="fab fa-superpowers"></i> Your Cart is Empty</h1>
    <Link href="/products" class="btn btn-orange">
      <i class="fa fa-home"></i> Go Shopping
    </Link>
  </template>
  <ul class="list-unstyled cart-list">
    <li v-for="(item, index) in cart" :key="item.line.id">
      <CartItem v-bind="item" @change="$emit('change', { index, quantity: $event })" @delete="$emit('delete', index)" />
    </li>
  </ul>
</template>
