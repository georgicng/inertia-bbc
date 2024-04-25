<script setup>
import { ref, computed } from 'vue'
import FormBuilder from '../form/FormBuilder.vue'

const props = defineProps({
  user: { type: Object, required: true },
  cityList: { type: Array, required: true }
})
const formRef = ref(null)

const fields = computed(() => ({
  firstName: { type: 'text', label: 'First name', validators: ['required'] },
  lastName: { type: 'text', label: 'Last name', validators: ['required'] },
  email: { type: 'email', label: 'Email', validators: ['required'] },
  phone: { type: 'text', label: 'Phone', validators: ['required'] },
  address: { type: 'textarea', label: 'Address', validators: ['required'] },
  landmark: { type: 'text', label: 'Nearest Landmark', validators: ['required'] },
  city: {
    type: 'select',
    label: 'City',
    options: props.cityList,
    validators: ['required']
  },
  ...(props.user?.city === 'Other'
    ? {
        altCity: {
          type: 'text',
          label: 'Other City',
          validators: ['required']
        }
      }
    : {})
}))
</script>

<template>
  <FormBuilder
    :ref="formRef"
    :fields="fields"
    :modelValue="user"
    :showAction="false"
    @update:modelValue="$emit('user', $event)"
  />
</template>
