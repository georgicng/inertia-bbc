<script setup>
import { Link } from '@inertiajs/vue3'
import { getImage } from '../../utils/helpers'

defineProps({ product: { type: Object, required: true } })
</script>

<template>
  <div class="dish-list my-3">
    <Link :href="`/details/${product.id}`">
      <img :src="getImage(product)" class="img-fluid" alt="dish-menu" />
    </Link>
    <div class="dish-list-text">
      <h4>
        <Link :href="`/details/${product.id}`">{{ product.data.name.en }}</Link>
      </h4>
      <h5>N{{ product.price.value }}</h5>
      <Link :href="`/details/${product.id}`" class="btn">
        Buy Now
        <span>
          <i class="fa fa-shopping-cart"></i>
        </span>
      </Link>
    </div>
  </div>
</template>
