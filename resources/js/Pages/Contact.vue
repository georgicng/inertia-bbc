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
  message: {
    type: 'textarea',
    label: 'Message'
  }
}
const model = ref({
  name: '',
  subject: '',
  email: '',
  message: ''
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
            <div class="col-md-6 offset-lg-2 col-lg-4 my-3 text-left">
              <FormBuilder :fields="fields" v-model="model" @submit="onSubmit" />
              <div v-if="processingContact" class="spinner-grow spinner-grow-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div v-if="status" class="status form-group">{{ status }}</div>
            </div>
            <div class="col-md-6 col-lg-4 my-3 text-left">
              <div
                v-for="item in page.content"
                :key="item.key"
                class="d-flex flex-row border h-10 rounded mb-2"
              >
                <div class="p-0 w-20">
                  <img :src="item.icon" alt="" class="img-fluid border-0" />
                </div>
                <div class="pl-3 pt-2 pr-2 pb-2 w-80 border-left">
                  <h4 class="py-2">
                    <a v-if="item.link" :href="item.link">{{ item.title }}</a>
                    <span v-else>{{ item.title }}</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
