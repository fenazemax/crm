<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="auth-layout">
    <h1 class="auth__title">Welcome to CRM</h1>
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--bg-sidebar);
}

.auth__title {
  top: 150px;
  margin: 0;
  padding: 0;
  font-size: 40px;
  color: var(--gray-90);
}
</style>
