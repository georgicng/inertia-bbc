<script setup>
defineProps({ payment: { type: Object, required: true }, meta: { type: Object, required: true } })
</script>

<template>
  <div v-if="payment == card" class="jumbotron">
    <h1 class="display-4">Complete Order</h1>
    <p class="lead">We need to confirm your Order.</p>
    <hr class="my-4" />
    <p>
      Please click on the <strong>Finish Button</strong> below to initiate payment online and
      complete the transaction.
    </p>

    <!--p class="lead">
      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </p-->
  </div>
  <div v-if="payment == transfer" class="jumbotron">
    <h1 class="display-4">Complete Order</h1>
    <p class="lead">We need to confirm your Order.</p>
    <hr class="my-4" />
    <p>
      Find our bank transfer details below and click on the <strong>Finish Button</strong> below to
      complete the transaction.
    </p>
    <div class="bank-message">{{ meta.bank }}</div>
    <!--p class="lead">
      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </p-->
  </div>
</template>
