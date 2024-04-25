<script setup>
defineProps({ name: { type: String, required: true }, price: { type: String, required: true } })
</script>

<template>
  <div class="menu-detail offset-lg-2 col-lg-8">
    <div class="menu-title">
      <div class="menu-name">
        <p>Name</p>
        <h3>{{ name }}</h3>
      </div>
      <div class="menu-price">
        <p>Price</p>
        <h3>N{{ price }}</h3>
      </div>
    </div>
  </div>
</template>
