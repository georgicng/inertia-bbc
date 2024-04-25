<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
  brand: {
    type: String,
    required: true,
  },
  socials: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <section id="footer" class="pd-t-b-30">
    <div class="container-fluid text-center">
      <ul class="footer-social no-back bordered-social mg-t15-b0 list-unstyled list-inline">
        <li v-for="social in socials" :key="social.type" class="list-inline-item">
          <a :href="social.link" target="_blank" rel="noreferrer">
            <span>
              <i :class="`fab ${social.icon}`"></i>
            </span>
          </a>
        </li>
      </ul>
      <p class="copyright">
        © 2018 <Link href="/">{{ brand }}</Link
        >. All rights reserved.
      </p>
    </div>
  </section>
</template>
