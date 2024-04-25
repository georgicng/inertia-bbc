<script setup>
import TopBar from './TopBar.vue'
import NavBar from './NavBar.vue'
import Logo from './Logo.vue'

defineProps({
  cartItemsCount: {
    type: Number,
    required: true,
  },
  menu: {
    type: Object,
    required: true,
  },
  logo: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <div class="header-lg d-none d-lg-block border-bottom">
    <Logo :logo="logo.image" :height="logo.height" />
    <TopBar :contacts="menu.contact" :socials="menu.social" />
    <NavBar :menu="menu.main" :cartItemsCount="cartItemsCount" />
  </div>
</template>
