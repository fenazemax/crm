<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchIcon from './Icons/SearchIcon.vue'
import BaseModal from './Modals/BaseModal.vue'
import UserIcon from './Icons/UserIcon.vue'
import { useAuthStore } from '@/stores/authStore'
import { useModalStore } from '@/stores/modalStore'
import { ModalType } from '@/types/modalType'
import AddCustomerModal from './Modals/AddCustomerModal.vue'
import CreateDealModal from './Modals/CreateDealModal.vue'
import MainModal from './Modals/MainModal.vue'

const route = useRoute()
const router = useRouter()
const pageTitle = computed(() => route.meta.title)
const authStore = useAuthStore()
const modal = useModalStore()

const openFilters = () => {
  console.log('Searching and filtering') // ЗАГЛУШКA
}

const openProfile = () => {
  router.push('/settings')
}

const opeAddNewModal = () => {
  modal.openModal(ModalType.Main)
}

const username = computed(() => {
  return authStore.user?.email.split('@')[0]
})
</script>

<template>
  <div class="header-container">
    <div class="header">
      <RouterLink to="/" class="header__logo-link">
        <img src="/Logo.png" class="header__img" />
      </RouterLink>
      <h2 class="header__title">{{ pageTitle }}</h2>
    </div>
    <div class="user">
      <button class="user__btn btn-pointer" @click="opeAddNewModal">Add new <span>+</span></button>
      <button class="user__search-btn btn-pointer" @click="openFilters">
        <SearchIcon></SearchIcon>
      </button>
      <button class="user__btn-profile" @click="openProfile">
        <UserIcon />
        <h5 class="user__btn-profile__title">{{ username }}</h5>
      </button>
    </div>
  </div>

  <BaseModal :type="ModalType.Main">
    <template #title> Add new </template>
    <MainModal />
  </BaseModal>

  <BaseModal :type="ModalType.AddCustomer">
    <template #title> Add New Customer </template>
    <AddCustomerModal />
  </BaseModal>

  <BaseModal :type="ModalType.CreateDeal">
    <template #title>Add New Deal</template>
    <CreateDealModal />
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.header-container {
  display: flex;
  justify-content: space-between;
}

.header {
  display: flex;
  flex: 1;
  height: 90px;
  background-color: var(--background);
  border-bottom: 1px solid var(--bg-sidebar);
  &__logo-link {
    display: flex;
    justify-content: center;
    width: 130px;
    padding: 20px;
    border-right: 1px solid var(--bg-sidebar);
  }
  &__title {
    margin: 0;
    padding: 0;
    padding-left: 24px;
    padding-top: 24px;
    font-weight: 700;
    font-size: 35px;
  }
}

.user {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 517px;
  background-color: $blue-light;
  border-bottom: 1px solid var(--bg-sidebar);
  &__btn {
    font-size: 18px;
    display: flex;
    border: none;
    background-color: var(--blue);
    padding: 10px 20px;
    border-radius: 20px;
    color: var(--white);
    span {
      margin-left: 10px;
    }
  }
  &__search-btn {
    padding: 15px;
    border-radius: 30px;
    background-color: var(--background);
    border: 1px solid var(--bg-sidebar);
  }
  &__btn-profile {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 15px;
    border-radius: 30px;
    background-color: var(--background);
    border: 1px solid var(--bg-sidebar);
    &__title {
      margin: 0;
    }
  }
}
</style>
