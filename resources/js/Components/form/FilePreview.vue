<script setup>
defineProps({
  file: {
    type: Object,
    default: null
  },
  closable: {
    type: Boolean,
    default: true
  }
})

function formatBytes(size, decimals = 2) {
  if (size === 0) return '0 bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(size) / Math.log(k))

  return `${parseFloat((size / k ** i).toFixed(dm))} ${sizes[i]}`
}
</script>

<template>
  <div class="preview">
    <div class="preview-detail">
      <img v-if="file.path" class="preview-thumb" :src="file.path" alt="card thumbnail" />
      <i v-else class="preview-thumb" :icon="faFilePdf" />
      <div class="preview-meta">
        <span class="preview-name">{{ file.name }}</span>
        <span class="preview-size">{{ formatBytes(file.size) }}</span>
      </div>
    </div>
    <button v-if="closable" class="preview-close" @click="$emit('close')">
      <in class="preview-close-icon" :icon="faTimes" />
    </button>
  </div>
</template>

<style lang="less" scoped>
.preview {
  background: rgb(255, 255, 255);
  border: 1px solid rgb(228, 231, 239);
  border-radius: 1px;
  box-shadow: 0 0 2px 0 rgba(107, 133, 151, 0.2);
  display: flex;
  justify-content: space-between;
  padding: 6px;
  @media only screen and (min-width: @screen-md) {
    max-width: 450px;
  }

  &-detail {
    display: flex;
  }

  &-thumb {
    border-radius: 2px;
    height: 32px;
    margin-right: 10px;
    width: 48px;
  }

  &-meta {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 18px;
  }

  &-name {
    color: rgb(0, 72, 119);
    font-weight: bold;
  }

  &-size {
    color: rgb(187, 189, 191);
  }

  &-close {
    background: transparent;
    border: none;
  }

  &-close-icon {
    height: 14px;
    width: 14px;
  }
}
</style>
