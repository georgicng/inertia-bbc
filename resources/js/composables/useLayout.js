import { ref, computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

export const useLayout = () => {
    const page = usePage();

    const loader = ref(false);
    function toggleLoader() {
        loader.value = !loader.value;
    }
    function showLoader(value) {
        loader.value = value;
    }

    const showNav = ref(false);
    function toggleNav() {
        showNav.value = !showNav.value;
    }
    function setShowNav(arg) {
        showNav.value = arg;
    }

    const showCart = ref(false);
    function toggleCart() {
        showCart.value = !showCart.value;
    }
    function setShowCart(arg) {
        showCart.value = arg;
    }

    const metaMap = computed(() => page.props.menu.main.reduce((acc, _menu) => ({ ...acc, [_menu.link]: _menu }), {}))
    const pageMeta = ref(null);
    function setPageMeta(key) {
        pageMeta.value = metaMap.value[key];
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
        setPageMeta,
    };
};
