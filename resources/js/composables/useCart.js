import { watch, computed } from "vue";
import { usePage } from '@inertiajs/vue3'

export const useCart = () => {
    const page = usePage()
    const discount = computed(() => page.props.cart.discountTotal);
    const cart = computed(() => page.props.cart.lines);
    const subtotal = computed(() => page.props.cart.subtotal);
    const total = computed(() => page.props.cart.total);
    const cartAction = () => {}

    return {
        discount,
        cart,
        subtotal,
        total,
        cartAction
    }
};
