<script setup>
import { SIZES } from '../../utils/constants'

defineProps({ description: { type: String, required: true } })
</script>

<template>
  <div class="row my-4">
    <div class="offset-lg-2 col-lg-8">
      <ul class="nav nav-tabs justify-content-start">
        <li v-if="description" class="nav-item">
          <a class="nav-link active" href="#description" data-toggle="tab"> Description </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#size" data-toggle="tab"> Size Examples </a>
        </li>
      </ul>

      <div class="tab-content">
        <div v-if="description" id="description" class="tab-pane active">
          <div class="my-4" v-html="description"></div>
        </div>
        <div id="size" :class="`tab-pane ${description ? '' : 'active'}`">
          <div id="img-tab" class="nav nav-pills my-4 justify-content-center" role="tablist">
            <a
              v-for="(size, index) in SIZES"
              :key="size.id"
              :href="`#${size.id}`"
              :class="`nav-item nav-link ${index === 0 ? 'active' : ''}`"
              data-toggle="tab"
              role="tab"
            >
              {{ size.label }}
            </a>
          </div>
          <div class="tab-content my-5">
            <div
              v-for="(size, index) in SIZES"
              :key="size.id"
              :class="`tab-pane ${index === 0 ? 'active' : ''}`"
              :id="size.id"
              role="tabpanel"
            >
              <img class="img-fluid" :src="size.image" alt="size diagram" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
