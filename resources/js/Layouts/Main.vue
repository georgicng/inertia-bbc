<script setup>
import { useLayout } from "@/composables/useLayout";
import { useCart } from "@/composables/useCart";
import SideNav from "./components/SideNav.vue";
import CartDrawer from "./components/CartDrawer.vue";
import BackDrop from "./components/BackDrop.vue";
import Header from "./components/Header.vue";
import Sticky from "./components/Sticky.vue";
import Hero from "./components/Hero.vue";
import Footer from "./components/Footer.vue";
import Loader from "./components/Loader.vue";
import { usePage } from "@inertiajs/vue3";

const {
    loader,
    showNav,
    showCart,
    pageMeta,
    toggleNav,
    setShowNav,
    setShowCart,
    toggleCart,
} = useLayout();
const { cart, discount, subtotal, total, cartAction } = useCart();
const page = usePage();
</script>

<template>
    <section class="main">
        <SideNav
            :showNav="showNav"
            :menu="page.props.layout.menu"
            :logo="page.props.layout.logos.sidenav"
            @toggle="toggleNav"
        />
        <CartDrawer
            :showCart="showCart"
            :cart="cart"
            :discount="discount"
            :subtotal="subtotal"
            :total="total"
            @change="cartAction"
            @toggle="toggleCart"
        />
        <div class="canvas">
            <BackDrop />
            <Header
                :menu="page.props.layout.menu"
                :logo="page.props.layout.logos.header"
                :cartItemsCount="cart.length"
            />
            <Sticky
                :cartItemsCount="cart.length"
                @toggle-cart="
                    () => {
                        setShowCart(true);
                        showNav && setShowNav(false);
                    }
                "
                @toggle-nav="
                    () => {
                        setShowNav(true);
                        showCart && setShowCart(false);
                    }
                "
            />
            <Hero v-if="pageMeta?.cover" :pageMeta="pageMeta" />
            <slot />
            <Footer
                :brand="page.props.layout.brand"
                :social="page.props.layout.menu.social"
            />
            <Loader v-if="loader" />
        </div>
    </section>
</template>

<style scoped>
.header-lg {
    background-color: #f2f2f2;
}
.header-lg .logo {
    text-align: center;
    position: absolute;
    top: 3px;
}
.header-lg .logo_wrapper {
    position: relative;
}
.header-lg .header-top {
    background-color: #2f2c2d;
    color: #fff;
    padding: 0.3em 0;
}
.header-lg .header-top a {
    color: #fff;
}
.header-login a {
    text-decoration: none;
    font-size: 0.9em;
    padding: 0.2em 1.6rem;
}
.header-lg .header-social a {
    width: 17px;
    height: 17px;
    margin: 0 0.3em;
}

.header-lg .navbar {
    padding: 0;
    margin: 2px 0;
}

.header-lg .lg-menu li {
    border-right: 1px solid #efefef;
}
.header-lg .lg-menu .nav-item .nav-link {
    font-size: 1em;
    color: #3a3a3a;
    padding: 1.8em 1.6em;
}
.header-lg .lg-menu .nav-item a:hover,
.header-lg .lg-menu .nav-item .Link-exact-active {
    color: #e24585;
}
.header-lg .search-right {
    padding: 0.6em 0 0;
}
.header-lg .cart {
    padding: 1rem;
    font-size: 1.5rem;
    position: relative;
}
.header-lg .cart .cart-badge {
    position: absolute;
    top: 0px;
    right: 10px;
    color: white;
    background: red;
    border-radius: 50%;
    font-size: 10px;
    padding: 5px;
}
.header-lg .dropdown-menu {
    min-width: 12rem;
    padding: 0;
    border: 0;
}
.header {
    height: 60px;
}
.header .fixed-header {
    padding: 10px 4px;
}
.header-links {
    position: relative;
}
.header .header-links a {
    color: #212121;
    font-size: 17px;
}
.header .header-links .cart-badge {
    position: absolute;
    top: -7px;
    right: -10px;
    min-height: 20px;
    min-width: 15px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 11px;
    background: #ee4899;
}

#mySidenav #main-menu .Link-exact-active {
    background-color: #e24585;
    color: #fff;
}

.innerpage-section-padding p {
    font-size: 1rem;
}

.dlist-inline dt,
.dlist-inline dd {
    display: inline-block;
}

#footer {
    background: #2f2c2d;
}
</style>
