<script setup lang="ts">
import SideBar from '../SideBar.vue'
import HeaderBar from '../HeaderBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <div class="header-content">
      <HeaderBar />
    </div>
    <div class="sidebar">
      <SideBar />
    </div>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.layout {
  display: grid;
  grid-template-columns: 171px 1fr;
  grid-template-rows: 91px 1fr;
  grid-template-areas:
    'header header'
    'sidebar main';
  height: 100vh;
  background-color: $background-color;
}

.header-content {
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}
</style>
