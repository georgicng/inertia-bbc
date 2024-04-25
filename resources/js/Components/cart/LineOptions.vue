<script setup>
import { computed } from 'vue'
const notEmpty = (value) => {
  if (Array.isArray(value) && value.length) {
    return true
  }

  if (!Array.isArray(value) && value) {
    return true
  }

  return false
}
const props = defineProps({ options: { type: Object, required: true } })
const lineOptions = computed(() =>
  Object.entries(props.options)
    .filter((arr) => notEmpty(arr[1]))
    .map(([key, value]) => ({ key, value }))
)
</script>

<template>
  <div v-for="line in lineOptions" :key="line.key" className="tag d-flex">
    <div>{{ line.key.charAt(0).toUpperCase() + line.key.slice(1).toLowerCase() }}:</div>
    <div v-if="Array.isArray(line.value)" className="tag-group d-flex">
      <div v-for="item in line.value" :key="item" className="tag-item">
        {{ item }}
      </div>
    </div>
    <div v-else className="tag-item">{{ line.value }}</div>
  </div>
</template>
