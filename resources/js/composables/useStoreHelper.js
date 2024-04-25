import { ref } from 'vue'

export const useStoreHelper = () => {
  const setter = (key, defVal) => {
    const value = ref(defVal)
    const setValue = (payload) => {
      value.value = payload
    }
    return {
      key: value,
      [`set${key.toUpperCase()}`]: setValue
    }
  }

  const request = (key, action) => {
    const loading = ref(false)
    const error = ref(null)
    const item = ref(null)
    async function fetch(payload) {
      try {
        loading.value = true
        const res = await action(payload)
        item.value = res.data
      } catch (e) {
        console.error(e)
        error.value = e
      } finally {
        loading.value = false
      }
    }

    return {
      [`loading${key.toUpperCase()}`]: loading,
      [`${key}Error`]:error,
      key: item,
      [`fetch${key.toUpperCase()}`]:fetch
    }
  }

  return {
    request,
    setter
  }
}
