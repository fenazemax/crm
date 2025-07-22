<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from './components/Layout/AuthLayout.vue'
import AppLayout from './components/Layout/AppLayout.vue'
import { useAuthStore } from './stores/authStore'

const route = useRoute()

const currentLayout = computed(() => {
  const layout = route.meta.layout
  return layout === 'auth' ? AuthLayout : AppLayout
})

const auth = useAuthStore()
auth.initAuth()
</script>

<template>
  <component :is="currentLayout"></component>
</template>

<style scoped lang="scss"></style>
