<script setup>
import Heading from '../Components/common/Heading.vue'
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
    <div id="contact-page">
      <div class="container-fluid">
        <Heading :title="page.title" :subtitle="page.subtitle" />

        <div class="no-back">
          <div class="row">
            <div class="col-sm-12 offset-lg-2 col-lg-8">
              <p v-for="(p, index) in page.content" :key="index">{{ p }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
