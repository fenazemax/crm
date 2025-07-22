<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import { ModalType } from '@/types/modalType'
import ArrowAdd from '../Icons/ArrowAdd.vue'
const modal = useModalStore()
const addCustomer = () => {
  modal.closeModal()
  modal.openModal(ModalType.AddCustomer)
}
const createDeal = () => {
  modal.closeModal()
  modal.openModal(ModalType.CreateDeal)
}
</script>

<template>
  <div class="modal__main">
    <button class="modal__link border btn-pointer" @click="createDeal">
      <img src="/Deals.png" class="modal__img" />
      <p class="modal__title-link">Deal</p>
      <ArrowAdd class="modal__arrow" />
    </button>
    <button class="modal__link btn-pointer" @click="addCustomer">
      <img src="/Customers.png" class="modal__img" />
      <p class="modal__title-link">Customer</p>
      <ArrowAdd class="modal__arrow" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.modal {
  &__main {
    @include flexbox-column;
    padding-bottom: 10px;
  }
  &__descr {
    display: flex;
    justify-content: space-between;
    width: 240px;
    border-bottom: 1px solid var(--bg-sidebar);
    padding: 10px 15px;
  }
  &__title {
    margin: 0;
    color: var(--gray-70);
    font-size: 18px;
  }
  &__btn-close {
    background-color: transparent;
    border: none;
  }
  &__link {
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
  }
  &__img {
    width: 20px;
    height: 20px;
    padding: 15px;
  }
  &__title-link {
    margin: 0;
    color: var(--navy);
    width: 140px;
    font-size: 18px;
  }
  &__arrow {
    padding: 15px;
  }
}
</style>
