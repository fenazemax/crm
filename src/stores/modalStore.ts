import { ModalType } from '@/types/modalType'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useModalStore = defineStore(
  'modal',
  () => {
    const modalStack = ref<ModalType[]>([])

    const openModal = (type: ModalType) => {
      modalStack.value.push(type)
      document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
      modalStack.value.pop()
      document.body.style.overflow = ''
    }

    const currentModal = computed(() => modalStack.value[modalStack.value.length - 1])
    const isOpen = (type: ModalType) => modalStack.value.includes(type)

    return {
      modalStack,
      currentModal,
      openModal,
      closeModal,
      isOpen,
    }
  },
  {
    persist: true,
  },
)
