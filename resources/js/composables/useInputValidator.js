import { ref, watch } from 'vue'

export default function (startVal, validators, onValidate) {
  const input = ref(startVal)
  const errors = ref([])
  watch(input, (value) => {
    if (validators) {
      errors.value = validators.map((validator) => validator(value))
    }
    onValidate(value)
  })
  return {
    input,
    errors
  }
}

const minLength = (min) => {
  return (input) => (input.length < min ? `Value must be at least ${min} characters` : null)
}

const isEmail = () => {
  const re = /\S+@\S+\.\S+/
  return (input) => (re.test(input) ? null : 'Must be a valid email address')
}

const isRequired = () => {
  return (input) => (!input.length ? `Value is required` : null)
}

export { isRequired, minLength, isEmail }
