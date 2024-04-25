<script setup>
import useInputValidator from '../../composables/useInputValidator'
import ErrorDisplay from './ErrorDisplay.vue'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { type: String, required: true }
})

const emit = defineEmits(['update:modelValue'])
const { input, errors } = useInputValidator(props.modelValue, props.validators, (value) =>
  emit('update:modelValue', value)
)
</script>

<template>
  <div class="form-group" :class="[field.cols ? `cols-md-${field.cols}` : '']">
    <label :for="field.name">{{ field.label }}</label>
    <select
      class="form-control"
      :id="field.name"
      :name="field.name"
      v-model="input"
    >
      <option v-for="(option, key) in field.options" :key="key" :value="option?.value || option">
        {{ option?.label || option }}
      </option>
    </select>
    <ErrorDisplay :errors="errors" />
  </div>
</template>
