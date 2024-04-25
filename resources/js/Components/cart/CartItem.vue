<script setup>
import LineOptions from './LineOptions.vue'
import { getImage } from '../../utils/helpers'

defineProps({
  readonly: { type: Boolean, required: true },
  line: { type: Object, required: true },
  price: { type: String, required: true },
  quantity: { type: String, required: true },
  options: { type: Array, required: true }
})
</script>

<template>
  <div v-if="readonly" class="order">
    <div class="order-item">
      <div class="order-item-info">
        <h4>{{ line.name }}</h4>
        <div class="d-flex flex-wrap">
          <LineOptions :options="options" />
        </div>
      </div>

      <div class="order-item-img">
        <figure>
          <img :src="getImage(line)" class="img-responsive" :alt="line.name" />
        </figure>
      </div>
    </div>

    <div class="total">
      <p>
        {{ quantity }} x N{{ line.price }} = <span>N{{ price }}</span>
      </p>
    </div>
  </div>
  <div v-else class="cart-item">
    <div class="item-text dish-list-text">
      <div>{{ line.name }}</div>
      <div>
        <label for="quantity">Qty:</label>
        <input
          type="number"
          min="1"
          id="quantity"
          name="quantity"
          :value="quantity"
          @change="$emit('change', $event.target.value)"
          class="form-control"
        />
        x N{{ price }}
      </div>
    </div>

    <div class="item-img">
      <figure>
        <img :src="getImage(line)" class="img-responsive" :alt="line.name" />
      </figure>
    </div>

    <div class="d-flex flex-column flex-wrap">
      <LineOptions :options="options" />
    </div>
    <div class="total">
      Total: <span>N{{ parseFloat(price) * parseInt(quantity) }}</span>
    </div>

    <div class="item-close">
      <button class="btn" @click="$emit('delete')">
        <span>
          <i class="fa fa-times-circle"></i>
        </span>
      </button>
    </div>
  </div>
</template>
