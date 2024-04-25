<script setup>
defineProps({
  contacts: {
    type: Array,
    required: true,
  },
  socials: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <div class="header-top">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 offset-lg-2">
          <nav class="header-login d-flex">
            <a v-for="contact in contacts" :key="contact.key" :href="contact.link">
              <i :class="`fa ${contact.icon}`"></i> {{ contact.title }}
            </a>
          </nav>
        </div>
        <div class="col-lg-4">
          <nav class="header-social text-right">
            <a v-for="social in socials" :key="social.key" :href="social.link">
              <span>
                <i :class="`fab ${social.icon}`"></i>
              </span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
