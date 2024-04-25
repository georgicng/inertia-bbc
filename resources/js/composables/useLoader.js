import { watch } from 'vue'
import { useLayout } from './useLayout'

export const useLoader = (loader) => {
    const { showLoader } = useLayout()
    watch(loader, (newVal) => showLoader(newVal), { immediate: true})
}
