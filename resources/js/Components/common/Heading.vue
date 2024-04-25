<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: false }
})
</script>

<template>
  <div class="innerpage-heading">
    <h3>{{title}}</h3>
    <hr class="page-heading-line" />
    <p v-if="subtitle">{{subtitle}}</p>
  </div>
</template>
