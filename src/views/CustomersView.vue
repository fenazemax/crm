<script setup lang="ts">
import CustomFilterDeal from '@/components/CustomElements/CustomFilterDeal.vue'
import CustomSortDeal from '@/components/CustomElements/CustomSortDeal.vue'
import ImageIcon from '@/components/Icons/ImageIcon.vue'
import { useCustomerStore } from '@/stores/customerStore'
import type { ICustomer } from '@/types/customerType'
import type { TOptions } from '@/types/dealsType'
import { computed, ref } from 'vue'
import { useSortedCustomers } from '@/composables/useSortedCustomers'
import EditDealIcon from '@/components/Icons/EditDealIcon.vue'
import { useModalStore } from '@/stores/modalStore'
import { ModalType } from '@/types/modalType'
import BaseModal from '@/components/Modals/BaseModal.vue'
import EditCustomerModal from '@/components/Modals/EditCustomerModal.vue'

const selectedCustomer = ref<ICustomer | null>(null)
const isAll = ref(false)
const customerStore = useCustomerStore()
const modalStore = useModalStore()
const customersCount = computed(() => customerStore.customers.length)
const sortedBy = ref<keyof ICustomer>('name')
const sortOptions: TOptions[] = [
  { label: 'Name', value: 'name' },
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
]
const { sortedCustomers } = useSortedCustomers(customerStore.customers, sortedBy)
const sortedCustomersHalf = computed(() => sortedCustomers.value.slice(0, 7))

const openEditModal = (customer: ICustomer) => {
  modalStore.openModal(ModalType.EditModal)
  selectedCustomer.value = customer
}
const updateCustomer = (updatedCustomer: ICustomer) => {
  customerStore.updateCustomer(updatedCustomer)
  selectedCustomer.value = null
  modalStore.closeModal()
}
</script>

<template>
  <div class="customers" v-if="customersCount > 0">
    <div class="customers__head">
      <p class="customers__count">Total: {{ customersCount }} customers</p>
      <div class="customers__sort-container">
        <CustomSortDeal v-model="sortedBy" :options="sortOptions" />
        <CustomFilterDeal />
      </div>
    </div>
    <ul class="customers__list" v-if="isAll === false">
      <li class="customers__item">
        <div class="customers__link link-item">
          <div class="customers__item-image">
            <ImageIcon />
          </div>
          <p class="customers__head-item">Name</p>
        </div>
        <p class="customers__head-item mail-item">Email</p>
        <p class="customers__head-item phone-item">Phone</p>
        <p class="customers__head-item adress-item">Address</p>
        <p class="customers__head-item edit-item">Edit</p>
      </li>
      <li class="customers__item" v-for="customer in sortedCustomersHalf" :key="customer.cid">
        <router-link :to="`/customer/${customer.cid}`" class="customers__link">
          <img :src="customer.avatar" alt="avatar" class="item__image" />
          <p class="customers__name">{{ customer.name }} {{ customer.secondname }}</p>
        </router-link>
        <p class="customers__name">{{ customer.email }}</p>
        <p class="customers__name">{{ customer.phone }}</p>
        <p class="customers__name">
          {{ customer.address?.street }}, {{ customer.address?.city }}, {{ customer.address?.state }}
          {{ customer.address?.zipCode }}
        </p>
        <button class="customers__btn" @click="openEditModal(customer)">
          <EditDealIcon />
        </button>
      </li>
      <button class="customers__load" v-show="sortedCustomers.length >= 7" @click="isAll = !isAll">Load More</button>
    </ul>
    <ul class="customers__list" v-else>
      <li class="customers__item">
        <div class="customers__link link-item">
          <div class="customers__item-image">
            <ImageIcon />
          </div>
          <p class="customers__head-item">Name</p>
        </div>
        <p class="customers__head-item mail-item">Email</p>
        <p class="customers__head-item phone-item">Phone</p>
        <p class="customers__head-item adress-item">Address</p>
        <p class="customers__head-item edit-item">Edit</p>
      </li>
      <li class="customers__item scroll-item" v-for="customer in sortedCustomers" :key="customer.cid">
        <router-link :to="`/customer/${customer.cid}`" class="customers__link">
          <img :src="customer.avatar" alt="avatar" class="item__image" />
          <p class="customers__name">{{ customer.name }} {{ customer.secondname }}</p>
        </router-link>
        <p class="customers__name">{{ customer.email }}</p>
        <p class="customers__name">{{ customer.phone }}</p>
        <p class="customers__name">
          {{ customer.address?.street }}, {{ customer.address?.city }}, {{ customer.address?.state }}
          {{ customer.address?.zipCode }}
        </p>
        <button class="customers__btn" @click="openEditModal(customer)">
          <EditDealIcon />
        </button>
      </li>
    </ul>
  </div>
  <div class="customers-no" v-else>
    <img src="/Customers.png" alt="no-customers" class="customers-no__img" />
    <p class="customers-no__descr">No customers found.</p>
  </div>
  <BaseModal :type="ModalType.EditModal">
    <template #title>Edit Customer</template>
    <EditCustomerModal
      v-if="selectedCustomer"
      :customer="selectedCustomer"
      @update:customer="updateCustomer"
      @close="selectedCustomer = null"
    />
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.customers {
  padding-left: 20px;
  padding-top: 20px;
  &__head {
    @include flexbox-between;
    margin-bottom: 34px;
    & > .customers__count {
      @include navy-descr;
      font-weight: 600;
    }
    & > .customers__sort-container {
      display: flex;
      gap: 20px;
    }
  }
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
    @include flexbox-column;
    & > .customers__item {
      display: flex;
      padding: 15px 12px;
      align-items: center;
      gap: 190px;
      justify-content: space-around;
      &:nth-child(2) {
        margin-bottom: 20px;
      }
      & > .customers__link {
        display: flex;
        gap: 30px;
        align-items: center;
        text-decoration: none;
        & > .item__image {
          width: 44px;
          height: 44px;
          border-radius: 70px;
        }
      }
      & > .customers__btn {
        @include def-btn;
      }
    }
    & > .customers__load {
      @include def-btn;
      font-size: 20px;
      color: $bluecolor;
    }
  }
  &__head-item {
    @include gray-descr;
  }
  &__name {
    @include navy-descr;
    font-size: 20px;
  }
}

.customers-no {
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
