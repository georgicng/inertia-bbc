<script setup>
import { Link } from '@inertiajs/vue3'

defineProps({
  link: { type: String, required: true },
  icon: { type: String, required: true },
  title: { type: String, required: true }
})
</script>

<template>
  <div class="card-banner my-3 col-md-6 offset-lg-2 col-lg-4">
    <Link :href="link">
      <div class="card-body" :style="{ height: '250px', backgroundImage: `url('${icon}')` }">
        <div class="text-bottom">
          <h2 class="title">{{ title }}</h2>
        </div>
      </div>
    </Link>
  </div>
</template>

<style scoped>
.card-banner .card-body {
  background-size: cover;
  position: relative;
  z-index: 10;
}
.card-banner .text-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 7px 20px;
  padding-top: 30px;
  border-radius: 0 0 0.25rem 0.25rem;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0)),
    to(rgba(0, 0, 0, 0.8))
  );
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
  color: #fff;
}
</style>
