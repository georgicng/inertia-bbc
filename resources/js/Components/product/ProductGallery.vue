<script setup>
import { getImage } from '../../utils/helpers'

defineProps({ product: { type: Object, required: true } })
</script>

<template>
  <ul id="menu-gallery" className="gallery list-unstyled cS-hidden menu-gallery text-center">
    <li :data-thumb="getImage(product)">
      <div className="p-img">
        <img :src="getImage(product)" :alt="product.name" />
      </div>
    </li>
  </ul>
</template>
