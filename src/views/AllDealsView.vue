<script setup lang="ts">
import CustomFilterDeal from '@/components/CustomElements/CustomFilterDeal.vue'
import CustomSortDeal from '@/components/CustomElements/CustomSortDeal.vue'
import EditDealIcon from '@/components/Icons/EditDealIcon.vue'
import ImageIcon from '@/components/Icons/ImageIcon.vue'
import BaseModal from '@/components/Modals/BaseModal.vue'
import EditDealModal from '@/components/Modals/EditDealModal.vue'
import { useSortedDeals } from '@/composables/useSortedDeals'
import { useDealStore } from '@/stores/dealsStore'
import { useModalStore } from '@/stores/modalStore'
import type { IDeal, TOptions } from '@/types/dealsType'
import { ModalType } from '@/types/modalType'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

const sortOptions: TOptions[] = [
  { label: 'Date Created', value: 'date' },
  { label: 'Status progress', value: 'progress' },
  { label: 'Price', value: 'price' },
  { label: 'Area', value: 'area' },
]
const sortedBy = ref<keyof IDeal>('date')
const isAll = ref(false)
const dealStore = useDealStore()
const modalStore = useModalStore()
const dealsCount = computed(() => {
  return dealStore.deals.length
})
const selectedDeal = ref<IDeal | null>(null)
const openEditModal = (deal: IDeal) => {
  modalStore.openModal(ModalType.EditModal)
  selectedDeal.value = deal
}

const updateDeal = (updatedDeal: IDeal) => {
  dealStore.updateDeal(updatedDeal)
  selectedDeal.value = null
  modalStore.closeModal()
}

const { sortedDeals } = useSortedDeals(dealStore.deals, sortedBy)
const sortedDealsHalf = computed(() => sortedDeals.value.slice(0, 7))
</script>

<template>
  <div class="deals" v-if="dealsCount > 0">
    <div class="deals__head">
      <p class="deals__count">Total: {{ dealsCount }} deals</p>
      <div class="deals__sort-container">
        <CustomSortDeal v-model="sortedBy" :options="sortOptions" />
        <CustomFilterDeal />
      </div>
    </div>
    <ul class="deals__list" v-if="isAll === false">
      <li class="deals__item">
        <div class="deals__link">
          <div class="deals__item-image">
            <ImageIcon />
          </div>
          <p class="deals__head-item name__item">Name</p>
        </div>
        <p class="deals__head-item deals__name-area">Area</p>
        <p class="deals__head-item">Appointment Date</p>
        <p class="deals__head-item">Price</p>
        <p class="deals__head-item">Status</p>
        <p class="deals__head-item">Edit</p>
      </li>
      <li class="deals__item" v-for="deal in sortedDealsHalf" :key="deal.id">
        <RouterLink :to="`/deal/${deal.id}`" class="deals__link">
          <img :src="deal.image" alt="" class="item__image" />
          <p class="deals__name">
            {{ deal.address.street }}, {{ deal.address.city }}, {{ deal.address.state }} {{ deal.address.zipCode }}
          </p>
        </RouterLink>
        <p class="deals__name area">{{ deal.area }} m2</p>
        <p class="deals__name">{{ dayjs(deal.date).format('MMM DD, YYYY HH:mm') }}</p>
        <p class="deals__name">{{ deal.price }} $</p>
        <p class="deals__name-progress">{{ deal.progress }}</p>
        <button class="deals__btn" @click="openEditModal(deal)">
          <EditDealIcon />
        </button>
      </li>
      <button class="deals__load" v-show="sortedDeals.length >= 7" @click="isAll = !isAll">Load More</button>
    </ul>
    <ul class="deals__list" v-else>
      <li class="deals__item">
        <div class="deals__link">
          <div class="deals__item-image">
            <ImageIcon />
          </div>
          <p class="deals__head-item name__item">Name</p>
        </div>
        <p class="deals__head-item deals__name-area">Area</p>
        <p class="deals__head-item">Appointment Date</p>
        <p class="deals__head-item">Price</p>
        <p class="deals__head-item">Status</p>
        <p class="deals__head-item">Edit</p>
      </li>
      <li class="deals__item scroll-item" v-for="deal in sortedDeals" :key="deal.id">
        <RouterLink :to="`/deal/${deal.id}`" class="deals__link">
          <img :src="deal.image" alt="" class="item__image" />
          <p class="deals__name">
            {{ deal.address.street }}, {{ deal.address.city }}, {{ deal.address.state }} {{ deal.address.zipCode }}
          </p>
        </RouterLink>
        <p class="deals__name area">{{ deal.area }} m2</p>
        <p class="deals__name">{{ dayjs(deal.date).format('MMM DD, YYYY HH:mm') }}</p>
        <p class="deals__name">{{ deal.price }} $</p>
        <p class="deals__name-progress">{{ deal.progress }}</p>
        <button class="deals__btn" @click="openEditModal(deal)">
          <EditDealIcon />
        </button>
      </li>
    </ul>
  </div>
  <div class="deals-no" v-else>
    <img src="/Deals.png" alt="no-deals" class="deals-no__img" />
    <p class="deals-no__descr">No deals found.</p>
  </div>
  <BaseModal :type="ModalType.EditModal">
    <template #title>Edit Deal</template>
    <EditDealModal v-if="selectedDeal" :deal="selectedDeal" @update:deal="updateDeal" @close="selectedDeal = null" />
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.deals {
  padding-left: 20px;
  padding-top: 20px;
  &__head {
    @include flexbox-between;
    margin-bottom: 34px;
    & > .deals__count {
      @include navy-descr;
      font-weight: 600;
    }
    & > .deals__sort-container {
      display: flex;
      gap: 20px;
    }
  }
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
    @include flexbox-column;
    & > .deals__item {
      display: flex;
      gap: 30px;
      padding: 15px 12px;
      align-items: center;
      justify-content: space-around;
      & > .deals__link {
        display: flex;
        gap: 30px;
        align-items: center;
        justify-content: space-around;
        text-decoration: none;
        & > .name__item {
          width: 302px;
        }
      }
      & > .item__image {
        width: 44px;
        height: 44px;
      }
      & > .area {
        width: 60px;
        font-size: 18px;
        font-weight: 500;
      }
      & > .deals__btn {
        @include def-btn;
      }
    }
    & > .deals__load {
      @include def-btn;
      font-size: 20px;
      color: $bluecolor;
    }
  }
  &__name {
    @include navy-descr;
    font-size: 20px;
  }
  &__head-item {
    @include gray-descr;
  }
}
.deals__name-progress {
  color: $bluecolor;
  font-size: 20px;
}
.deals-no {
  position: absolute;
  display: flex;
  align-items: center;
  top: 50%;
  left: 50%;
  gap: 20px;
  user-select: none;
  &__img {
    width: 34px;
    height: 34px;
  }
  &__descr {
    @include gray-descr;
    font-size: 24px;
  }
}
</style>
