<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
  menu: {
    type: Array,
    required: true,
  },
  cartItemsCount: {
    type: Number,
    required: true,
  }
})
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <nav class="navbar navbar-expand" role="navigation">
          <ul class="navbar-nav lg-menu">
            <li v-for="menuItem in menu" :key="menuItem.key" class="nav-item">
              <template v-if="menuItem.children">
                <Link
                  href="/"
                  class="nav-link dropdown-toggle"
                  :id="`${menuItem.key}MenuLink`"
                  data-toggle="dropdown"
                >
                  {{ menuItem.title }}
                </Link>
                <div class="dropdown-menu">
                  <Link
                    v-for="subMenu in menuItem.children"
                    :key="subMenu.key"
                    :href="subMenu.link"
                    class="list-group-item"
                  >
                    {{ subMenu.title }}
                  </Link>
                </div>
              </template>
              <Link v-else :href="menuItem.link" class="nav-link">
                {{ menuItem.title }}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-lg-2">
        <div class="search-right text-right">
          <div class="cart box_1">
            <Link href="/cart">
              <i class="fa fa fa-shopping-basket"></i>
              <span class="cart-badge">{{ cartItemsCount }}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
