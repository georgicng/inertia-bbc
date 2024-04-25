<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
  logo: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="logo-area">
    <div class="container">
      <div class="logo_wrapper">
        <div class="logo">
          <Link href="/">
            <img :src="logo" class="logo" :height="height" alt="" />
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>
