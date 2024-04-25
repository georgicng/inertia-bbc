<script setup>
import AccordionPanel from '../Components/common/AccordionPanel.vue'
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
    <div id="complaint-page">
      <div class="container-fluid text-center">
        <Heading :title="page.title" :subtitle="page.subtitle" />
        <div class="no-back">
          <div class="row">
            <div v-if="page.content" class="col-sm-12 offset-lg-2 col-lg-8">
              <AccordionPanel v-for="item in Object.entries(page.content)" :key="item[0]" :title="item[0]">
                <div v-html="item[1]"></div>
              </AccordionPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
