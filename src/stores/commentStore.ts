import type { TComments } from '@/types/dealsType'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useDealStore } from './dealsStore'

export const useCommentStore = defineStore(
  'activity',
  () => {
    const comments = ref<TComments[]>([])
    const dealStore = useDealStore()

    const addComment = (newCom: TComments, dealId: number) => {
      const deal = dealStore.deals.find((d) => d.id === dealId)
      if (deal) {
        deal.comments?.push(newCom)
        comments.value.push(newCom)
      }
    }

    const deleteComment = (comId: number, dealId: number) => {
      const deal = dealStore.deals.find((d) => d.id === dealId)
      if (deal) {
        comments.value = comments.value.filter((com) => com.id !== comId)
        deal.comments = deal.comments?.filter((com) => com.id !== comId)
      }
    }

    return {
      comments,
      addComment,
      deleteComment,
    }
  },
  {
    persist: true,
  },
)
