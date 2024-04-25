<script setup>
defineProps({
  showError: { type: Object, required: true },
  user: { type: Object, required: true },
  shipping: { type: Object, required: true },
  shippingOptions: { type: Object, required: true },
  cityShippingMap: { type: Object, required: true }
})
</script>

<template>
  <div v-if="user.city === 'Other' && shipping.key === 'home'" class="red card my-3">
    <div class="card-header">Delivery Method</div>
    <div class="card-body">We do not deliver to other states</div>
  </div>

  <div v-else class="`${showError && 'red'} card my-3`">
    <div class="card-header">Delivery Method</div>
    <div v-for="[key, value] in Object.entries(shippingOptions)" class="card-body" :key="key">
      <h4 class="card-title">{{ value.name }}</h4>
      <template v-if="key !== 'home'">
        <div v-for="item in value.options" class="custom-control custom-radio" :key="item.id">
          <input
            type="radio"
            class="custom-control-input"
            :id="item.id"
            :value="item.id"
            :checked="shipping.id == item.id"
            @change="
              $emit('update:shipping', {
                type: key,
                id: $event.target.value,
                rate: item.cost
              })
            "
          />
          <label class="custom-control-label" :for="item.id">
            <h4>
              {{ item.title }} <span class="badge">N{{ item.cost }}</span>
            </h4>
          </label>
        </div>
      </template>
      <template v-else>
        <template v-if="user.city !== 'Other'">
          <div class="custom-control custom-radio">
            <input
              type="radio"
              :value="cityShippingMap[user.city].id"
              :id="cityShippingMap[user.city].id"
              class="custom-control-input"
              :checked="shipping.id == cityShippingMap[user.city].id"
              @change="
                $emit('update:shipping', {
                  type: key,
                  id: $event.target.value,
                  rate: cityShippingMap[user.city].cost
                })
              "
            />
            <label class="custom-control-label" :for="cityShippingMap[user.city].id">
              <h4>
                {{ cityShippingMap[user.city].title }}
                <span class="badge"> N{{ cityShippingMap[user.city].cost }} </span>
              </h4>
            </label>
          </div>
          <div
            v-if="shipping.id == cityShippingMap[user.city].id"
            class="custom-control custom-checkbox"
          >
            <input
              type="checkbox"
              class="custom-control-input"
              id="express"
              :checked="shipping?.express"
              @change="$emit('update:express', $event.target.value)"
            />
            <label class="custom-control-label" for="express">
              <h4>Express Delivery <span class="badge">N1000</span></h4>
            </label>
          </div>
        </template>
      </template>
    </div>
    <div v-if="showError" class="card-body error">Please select a delivery method</div>
  </div>
</template>
