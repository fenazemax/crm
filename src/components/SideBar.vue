<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { SIDEBAR_DATA } from '../components/sideBar.data'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const handeLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <aside class="sidebar">
    <RouterLink class="sidebar__container" v-for="card in SIDEBAR_DATA" :key="card.id" :to="card.path">
      <img :src="card.icon" alt="sidebar-card" class="sidebar__container__top" />
      <p class="sidebar__container__title">{{ card.title }}</p>
    </RouterLink>
    <button class="sidebar__container btn-pointer" @click="handeLogout">
      <img src="/logout.png" class="sidebar__container__top" />
      Logout
    </button>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 150px;
  height: 100vh;
  padding-top: 10px;
  padding-right: 20px;
  border-right: 1px solid var(--bg-sidebar);
  // border-top: 1px solid var(--bg-sidebar);
  background-color: var(--background);
  &__container {
    display: flex;
    gap: 6px;
    border: 1px solid var(--bg-sidebar);
    border-radius: 30px;
    background-color: var(--white);
    padding: 25px;
    text-decoration: none;
    color: var(--gray-90);
    &__top {
      width: 25%;
      height: 25px;
    }
    &__title {
      margin: 0;
      padding: 0;
      padding-top: 3px;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
