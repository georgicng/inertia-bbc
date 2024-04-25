<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
  showNav: { type: Boolean, default: false },
  menu: {
    type: Object,
    required: true,
  },
  logo: {
    type: Object,
    required: true,
  }
})
defineEmits(['toggle'])
</script>

<template>
  <div class="sidenav-content">
    <div id="mySidenav" :class="`sidenav ${showNav ? 'to-left-toggle' : ''} `">
      <div id="web-name">
        <div class="text-center">
          <img :src="logo.image" class="logo" :height="logo.height" alt="" />
        </div>
        <ul class="main-menu-social list-inline list-unstyled text-center">
          <li v-for="social in menu.socials" :key="social.type" class="list-inline-item">
            <a :href="social.link" target="_blank" rel="noreferrer">
              <span>
                <i :class="`fab ${social.icon}`"></i>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div id="main-menu">
        <div class="sidenav-closebtn">
          <button class="btn btn-default" id="sidenav-close" @click="$emit('toggle')">
            &times;
          </button>
        </div>
        <div class="list-group panel">
          <template v-for="menuItem in menu.main" :key="menuItem.key">
            <template v-if="menuItem?.children">
              <a :href="`#menu-${menuItem.key}`" class="list-group-item" data-toggle="collapse">
                <span>
                  <i :class="`${menuItem.icon} sidebar-icon`"></i>
                </span>
                {{ menuItem.title }}
                <span>
                  <i class="fa fa-caret-down arrow"></i>
                </span>
              </a>
              <div class="sub-menu collapse" :id="`menu-${menuItem.key}`" data-parent="#main-menu">
                <Link
                  v-for="subMenu in menuItem.children"
                  :key="subMenu.key"
                  :href="subMenu.link"
                  class="list-group-item"
                  @click="$emit('toggle')"
                >
                  {{ subMenu.title }}
                </Link>
              </div>
            </template>
            <Link
              v-else
              :href="menuItem.link"
              class="list-group-item"
              @click="$emit('toggle')"
            >
              <span>
                <i :class="`${menuItem.icon} sidebar-icon`"></i>
              </span>
              {{ menuItem.title }}
            </Link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
