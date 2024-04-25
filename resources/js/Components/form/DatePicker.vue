<script setup>
import useInputValidator from '../../composables/useInputValidator'
import ErrorDisplay from './ErrorDisplay.vue'
import Datepicker from 'vuejs3-datepicker'

const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  modelValue: {
    type: [String],
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const { input, errors } = useInputValidator(props.modelValue, props.validators, (value) =>
  emit('update:modelValue', value)
)
</script>

<template>
  <div class="form-group" :class="[field.cols ? `cols-md-${field.cols}` : '']">
    <label :for="field.name">{{ field.label }}</label>
    <Datepicker
      class="form-control"
      :id="field.name"
      v-model="input"
      v-bind="$attrs"
    />
    <ErrorDisplay :errors="errors" />
  </div>
</template>
