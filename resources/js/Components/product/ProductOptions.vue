<script setup>
import { OPTION_TYPE_MAP } from '../../utils/constants'
import Multiselect from 'vue-multiselect'

defineProps({
  options: { type: Array, required: true },
  model: { type: Object, required: true },
  errors: { type: Object, required: true },
  showError: { type: Boolean, required: true }
})
</script>

<template>
  <div id="productform">
    <div v-for="option in options" class="form-group" :key="option.name" :data-option="option.id">
      <div v-if="option.type == OPTION_TYPE_MAP.TEXTBOX">
        <label :for="option.id" class="font-weight-bold">
          {{ option.label }}
        </label>
        <input
          type="text"
          class="form-control"
          :name="option.name"
          :id="option.id"
          :value="model[option.name]"
          :maxLength="option.maximum || null"
          @change="$emit('update:model', { key: option.name, value: $event.target.value })"
        />
      </div>

      <div v-if="option.type == OPTION_TYPE_MAP.SELECT">
        <label :for="option.name" class="font-weight-bold">
          {{ option.label }}
        </label>
        <Multiselect
          :multiple="false"
          track-by="id"
          label="label"
          selectLabel="Click to select"
          deselectLabel="Click to remove"
          :model-value="model[option.name]"
          :options="option.options"
          :searchable="false"
          @update:model-value="$emit('update:model', { key: option.name, value: $event })"
        ></Multiselect>
      </div>

      <div v-if="option.type == OPTION_TYPE_MAP.RADIO">
        <label :for="option.id" class="font-weight-bold">
          {{ option.label }}
        </label>
        <div v-for="value in option.options" class="custom-control custom-radio" :key="value.id">
          <input
            type="radio"
            class="custom-control-input"
            :name="option.name"
            :id="value.id"
            :value="value.value"
            @change="$emit('update:model', { key: option.name, value: $event.target.value })"
          />
          <label class="custom-control-label" :for="value.id">
            {{ value.label }}
          </label>
        </div>
      </div>

      <div v-if="option.type == OPTION_TYPE_MAP.CHECKBOX">
        <label :for="option.name" class="font-weight-bold">
          {{ option.label }}
        </label>
        <Multiselect
          :multiple="true"
          track-by="id"
          label="label"
          selectLabel="Click to select"
          deselectLabel="Click to remove"
          :max="option.maximum"
          :model-value="model[option.name]"
          :options="option.options"
          :searchable="false"
          @update:model-value="$emit('update:model', { key: option.name, value: $event })"
        ></Multiselect>
      </div>

      <div v-if="option.type == OPTION_TYPE_MAP.TEXTAREA">
        <label :for="option.name" class="font-weight-bold">
          {{ option.label }}
        </label>
        <textarea
          class="form-control"
          :id="option.name"
          :value="model[option.name]"
          @change="$emit('update:model', { key: option.name, value: $event.target.value })"
        ></textarea>
      </div>

      <div v-if="showError && errors[option.name]" class="error d-flex">
        {{ errors[option.name][0] }}
      </div>
    </div>
  </div>
</template>

<style >
@import "vue-multiselect/dist/vue-multiselect.css";
</style>