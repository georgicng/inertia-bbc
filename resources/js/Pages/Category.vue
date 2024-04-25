<script setup>
import CategoryCard from '../Components/product/CategoryCard.vue'
import Layout from '@/Layouts/Main.vue'

defineOptions({ layout: Layout })
defineProps({
  categories: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="categories-page">
      <div class="container" id="categories">
        <div class="row">
          <div
            v-for="category in categories.data"
            :key="category.id"
            class="col-md-6 col-lg-4 col-xl-3 my-3"
          >
            <CategoryCard :category="category" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
