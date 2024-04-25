<script setup>
import { computed } from 'vue'

const props = defineProps({
  steps: { type: Array, required: true },
  stepIndex: { type: Number, required: true }
})

const getStepClass = (step) => {
  let cls = 'step'
  if (props.stepIndex === step) {
    cls += ' step-active'
  } else if (props.stepIndex > step) {
    cls += ' step-done'
  } else {
    cls += ' step-inactive'
  }
  return cls
}

const step = computed(() => {
  return props.steps[props.stepIndex]
})
</script>

<template>
  <div>
    <div class="steps-container">
      <div v-for="(item, index) in steps" :class="getStepClass(index)" :key="item.key">
        <div>
          <div class="circle"><i :class="item.icon"></i></div>
        </div>
        <div class="label">{{ item.title }}</div>
        <div v-if="index < steps.length - 1" class="line"></div>
      </div>
    </div>
    <div :style="{ padding: '20px' }">
      <component :is="step.component" v-bind="step.props" v-on="step.events" />
    </div>
    <slot name="action"></slot>
  </div>
</template>
