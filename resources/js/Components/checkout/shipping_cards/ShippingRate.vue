<script setup>
defineProps({ shippingRate: { type: Number, required: true } })
</script>

<template>
  <div class="counter text-center my-3">
    <i class="fa fa-code fa-2x"></i>
    <h2 class="timer count-title count-number">N{{ shippingRate }}</h2>
    <p class="count-text">Total Shipping</p>
  </div>
</template>
