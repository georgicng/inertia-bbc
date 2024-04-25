<script setup>
defineProps({ coupon: { type: String, required: true } })
const emit = defineEmits(['addCoupon'])

const onSubmit = (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  emit('addCoupon', formData.get('coupon'))
}
</script>

<template>
  <div class="card coupon">
    <div class="card-header" id="headingOne">
      <a
        data-toggle="collapse"
        href="#collapseExample"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        I have Promo Code
      </a>
    </div>
    <div class="collapse" id="collapseExample">
      <form class="card-body" @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="coupon">Enter Promo Code</label>
          <input type="text" name="coupon" class="form-control" id="coupon" :value="coupon" />
          <button class="my-3 btn btn-orange">Redeem</button>
        </div>
      </form>
    </div>
  </div>
</template>
