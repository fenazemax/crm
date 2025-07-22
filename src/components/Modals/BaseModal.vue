<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import { ModalType } from '@/types/modalType'
import CloseModal from '../Icons/CloseModal.vue'
import { useEventListener } from '@vueuse/core'

const props = defineProps<{
  type: ModalType
}>()

const modalStore = useModalStore()

const close = () => {
  if (modalStore.currentModal === props.type) modalStore.closeModal()
}

useEventListener('keydown', (e) => {
  if (e.key === 'Escape') close()
})
</script>

<template>
  <Teleport to="body">
    <div class="modal" v-if="modalStore.isOpen(type)" @click.self="close">
      <div class="modal__content">
        <div class="modal__descr">
          <p class="modal__title">
            <slot name="title" />
          </p>
          <button class="modal__btn-close" @click="close">
            <CloseModal />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba($color: #000000, $alpha: 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  &__content {
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    overflow-y: auto;
    max-height: 90vh;
  }
  &__descr {
    @include flexbox-between;

    padding: 24px 32px;
    & > .modal__btn-close {
      border: none;
      background-color: transparent;
    }
  }
  &__title {
    @include navy-descr;
    font-weight: 600;
  }
}
</style>
