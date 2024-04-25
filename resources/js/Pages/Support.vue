<script setup>
import { ref } from 'vue'
import FormBuilder from '../Components/form/FormBuilder.vue'
import Heading from '../Components/common/Heading.vue'
import Layout from '@/Layouts/Main.vue'

defineOptions({ layout: Layout })
defineProps({
  page: {
    type: Object,
    required: true
  }
})

const fields = {
  name: {
    type: 'text',
    label: 'Name'
  },
  subject: {
    type: 'text',
    label: 'Subject'
  },
  email: {
    type: 'email',
    label: 'Email'
  },
  description: {
    type: 'textarea',
    label: 'Description'
  }
}
const model = ref({
  name: '',
  subject: '',
  email: '',
  description: '',
})

const onSubmit = (formData) => {
  //TODO
}
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="contact-page">
      <div class="container-fluid text-center">
        <Heading :title="page.title" :subtitle="page.subtitle" />

        <div class="no-back">
          <div class="row">
            <div class="col-sm-12 offset-lg-2 col-lg-8 text-left">
              <FormBuilder :fields="fields" v-model="model" @submit="onSubmit" />
              <div v-if="processingIssue" class="spinner-grow spinner-grow-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div v-if="status" class="status form-group">{{ status }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
