<script setup>
defineProps({
  showError: { type: Object, required: true },
  payment: { type: Object, required: true },
  paymentOptions: { type: Object, required: true }
})
</script>

<template>
  <div class="`${showError ? 'red' : ''} card my-3`">
    <div class="card-header">Payment Method</div>
    <div class="card-body">
      <div
        v-for="item in paymentOptions"
        class="custom-control custom-radio panel my-3"
        :key="item.id"
      >
        <input
          type="radio"
          :id="item.id"
          :value="item.id"
          class="custom-control-input"
          :checked="payment === item.id"
          @change="$emit('update:payment', $event.target.value)"
        />
        <label class="custom-control-label panel-body" :for="item.id">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </label>
      </div>
    </div>
    <div v-if="showError" class="card-body error">Please select a payment method</div>
  </div>
</template>
