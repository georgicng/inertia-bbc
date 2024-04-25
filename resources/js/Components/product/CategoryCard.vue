<script setup>
import { Link } from '@inertiajs/vue3'
import { getImage, getLink } from '../../utils/helpers'

defineProps({ category: { type: Object, required: true } })
</script>

<template>
  <Link :href="getLink(category)">
    <div class="card">
      <img class="w-100" :src="getImage(category)" :alt="category.media.meta.caption" />
      <div class="btn view-btn">{{ category.data.name.en }}</div>
    </div>
  </Link>
</template>
