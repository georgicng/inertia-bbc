<script setup>
import { ref } from 'vue'
import Preview from './preview.vue'
import { MAX_UPLOAD_SIZE } from '../../utils/config'

defineProps({
  label: {
    type: String,
    required: true
  },
  // accept multiple files from user
  icon: {
    type: Object,
    required: true
  },
  accept: {
    type: String,
    default: '.jpeg,.jpg,.png,.heic,.pdf'
  },
  modelValue: {
    type: Object,
    default: null
  },
  maxSize: {
    default: MAX_UPLOAD_SIZE,
    type: Number
  }
})
const emit = defineEmits(['lengthError', 'update:modelValue', 'error'])
const inputRef = ref(null)

function fileInputChange() {
  const file = inputRef.value.files[0]
  const FILE_TYPES = ['image/png', 'image/jpeg', 'image/heic', 'application/pdf']
  if (file.size > this.maxSize) {
    emit('lengthError')
  }
  if (!FILE_TYPES.includes(file.type)) {
    emit('error')
    return
  }
  let value
  if (file.type === 'application/pdf') {
    value = {
      file,
      name: file.name,
      size: file.size
    }
    inputRef.value = ''
    emit('update:modelValue', value)
    return
  }
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.addEventListener('load', (e) => {
    value = {
      file,
      name: file.name,
      size: file.size,
      path: e.target.result
    }
    inputRef.value = ''
    emit('update:modelValue', value)
  })
}

function onClick() {
  inputRef.value.click()
}
</script>

<template>
  <div class="up">
    <Preview v-if="value" :file="value" @close="$emit('update:modelValue', null)" />
    <div v-else class="file-upload-container">
      <button @click="onClick">{{ label }}</button>

      <!--hidden input file-->
      <input
        v-show="false"
        ref="inputRef"
        type="file"
        name="file-upload"
        :accept="accept"
        capture="environment"
        @change="fileInputChange"
      />
    </div>
  </div>
</template>
