<script setup>
import { computed } from 'vue'
import Heading from '../Components/common/Heading.vue'
import ProductCard from '../Components/product/ProductCard.vue'
import Layout from '@/Layouts/Main.vue'

defineOptions({ layout: Layout })
const props = defineProps({
  products: {
    type: Object,
    required: true
  }
})

const title = computed(
  () => props?.products?.data[0]?.collection?.name?.en ?? "Nil"
)
</script>

<template>
  <div id="menu-page" class="page-wrapper innerpage-section-padding">
    <div class="container text-center menu">
      <Heading v-if="title" :title="title" />
      <div id="breakfast-dishes" class="no-back">
        <div class="row">
          <div v-for="product in products.data" :key="product.id" class="col-sm-6 col-md-4 col-lg-3">
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
