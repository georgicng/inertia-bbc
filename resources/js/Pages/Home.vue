<script setup>
import Block from '@/Components/common/Block.vue'
import Layout from '@/Layouts/Main.vue'

defineOptions({ layout: Layout })
defineProps({
  page: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="home-page">
      <div class="container-fluid">
        <div class="row">
          <Block v-for="block in page.content" :key="block.key" v-bind="block" />
        </div>
      </div>
    </div>
  </section>
</template>
