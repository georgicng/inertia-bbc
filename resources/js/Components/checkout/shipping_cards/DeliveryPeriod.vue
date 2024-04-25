<script setup>
import { ref, computed } from 'vue'
import FormBuilder from '../../form/FormBuilder.vue'

const props = defineProps({
  showError: { type: Object, required: true },
  timeOptions: { type: Object, required: true },
  delivery: { type: Object, required: true },
  express: { type: Boolean, default: false }
})

defineEmits(['update:delivery'])

const getDate = () => {
  const today = new Date()
  const tomorrow = new Date()
  //set delivery date to 24 hrs
  tomorrow.setDate(today.getDate() + 1)
  //if order is after clsoing hours (5PM)  or on saturday, make delivery 48hrs
  if (tomorrow.getDay() == 0 || today.getHours() > 17) {
    tomorrow.setDate(today.getDate() + 2)
  }
  return tomorrow
}

const fields = computed(() => ({
  date: {
    type: 'date',
    label: 'Delivery Date',
    format: 'date',
    props: {
      disabledDates: { days: [0], to: getDate() },
      disabled: props.expresss,
      format: "'dd/MM/yyyy'",
      'input-class': 'form-control'
    }
  },
  time: {
    type: 'select',
    label: 'Delivery Time',
    options: props.timeOptions
  }
}))
</script>

<template>
  <div :class="`${showError && 'red'} card my-3`">
    <div class="card-header">Delivery Day</div>
    <div class="card-body">
      <FormBuilder
        :modelValue="delivery"
        :fields="fields"
        :showErrorList="false"
        :showAction="false"
        @update:model-value="$emit('update:delivery', $event)"
      />
      <small> For store pickups, you can call in to arrange an earlier time if need be </small>
    </div>
    <div v-if="showError" class="card-body error">Please select a delivery date && time</div>
  </div>
</template>
