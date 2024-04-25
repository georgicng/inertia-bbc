import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MENU } from '../utils/constants'

const metaMap = MENU.reduce((acc, menu) => ({ ...acc, [menu.path]: menu }), {})

export const useLayoutStore = defineStore('layout', () => {
  const loader = ref(false)
  function toggleLoader() {
    loader.value = !loader.value
  }
  function showLoader(value) {
    loader.value = value
  }

  const showNav = ref(false)
  function toggleNav() {
    showNav.value = !showNav.value
  }
  function setShowNav(arg) {
    showNav.value = arg
  }

  const showCart = ref(false)
  function toggleCart() {
    showCart.value = !showCart.value
  }
  function setShowCart(arg) {
    showCart.value = arg
  }

  const pageMeta = ref(null)
  function setPageMeta(key) {
    pageMeta.value = metaMap[key]
  }

  return {
    loader,
    toggleLoader,
    showLoader,
    showNav,
    toggleNav,
    setShowNav,
    showCart,
    toggleCart,
    setShowCart,
    pageMeta,
    setPageMeta
  }
})
