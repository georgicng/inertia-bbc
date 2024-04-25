<script setup>
defineProps({
  pageMeta: {
    type: Object,
    required: true
  },
})
</script>

<template>
    <div class="page-cover">
      <div class="container-fluid">
        <h3>
          <span class="d-none cover-left-icon float-left">
            <i :class="pageMeta.icon"></i>
          </span>
          {{pageMeta.name}}
          <span class="d-none cover-right-icon float-right">
            <i :class="`${pageMeta.icon}`"></i>
          </span>
        </h3>
      </div>
    </div>
</template>
