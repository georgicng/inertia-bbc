<script setup>
import { Link } from '@inertiajs/vue3'

const title = 'Thank You!'
const subtitle = 'Your order has been recorded'
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="contact-page">
      <div class="container text-center">
        <div class="innerpage-heading">
          <div class="jumbotron text-xs-center">
            <h1 class="display-3">{{ title }}</h1>
            <p class="lead">
              <strong>{{ subtitle }}</strong>
            </p>
            <hr />
            <p>Having trouble? <Link href="/complaint">Contact us</Link></p>
            <p class="lead">
              <Link href="/" class="btn btn-primary btn-sm" role="button">
                Continue to homepage
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
