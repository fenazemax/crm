<script setup lang="ts">
import DeleteIcon from '@/components/Icons/DeleteIcon.vue'
import EditCustomerIcon from '@/components/Icons/EditCustomerIcon.vue'
import BaseModal from '@/components/Modals/BaseModal.vue'
import ConfirmDeleteModal from '@/components/Modals/ConfirmDeleteModal.vue'
import EditCustomerModal from '@/components/Modals/EditCustomerModal.vue'
import { useCustomerStore } from '@/stores/customerStore'
import { useModalStore } from '@/stores/modalStore'
import type { ICustomer } from '@/types/customerType'
import { ModalType } from '@/types/modalType'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  cid: string
}>()

const customerStore = useCustomerStore()
const modalStore = useModalStore()

const router = useRouter()
const customer = customerStore.customers.find((c) => c.cid === Number(props.cid))
const customerDeals = computed(() => customer?.deals?.slice(0, 3))
const selectedCustomer = ref<ICustomer | null>(null)

const openDeleteModal = (customer: ICustomer) => {
  modalStore.openModal(ModalType.DeleteDeal)
  selectedCustomer.value = customer
}
const openEditModal = (customer: ICustomer) => {
  modalStore.openModal(ModalType.EditModal)
  selectedCustomer.value = customer
}
const deleteCustomer = (customerId: number) => {
  try {
    customerStore.deleteCustomer(customerId)
    selectedCustomer.value = null
    modalStore.closeModal()
    router.push('/customers')
  } catch (error) {
    console.error('Error deleting customer:', error)
  }
}
const updateCustomer = (updatedCustomer: ICustomer) => {
  customerStore.updateCustomer(updatedCustomer)
  selectedCustomer.value = null
  modalStore.closeModal()
}
</script>

<template>
  <div class="details" v-if="customer">
    <div class="details__left">
      <div class="details__img-container">
        <img :src="customer.avatar" alt="customer" class="details__img" />
        <button class="details__edit" @click="openEditModal(customer)">
          <EditCustomerIcon />
        </button>
        <button class="details__delete" @click="openDeleteModal(customer)">
          <DeleteIcon />
        </button>
      </div>
      <ul class="details__list">
        <li class="details__item">
          <p class="details__title">First Name</p>
          <input type="text" class="details__input" v-model="customer.name" disabled />
        </li>
        <li class="details__item">
          <p class="details__title">Last Name</p>
          <input type="text" class="details__input" v-model="customer.secondname" disabled />
        </li>
        <li class="details__item">
          <p class="details__title">Email</p>
          <input type="text" class="details__input" v-model="customer.email" disabled />
        </li>
        <li class="details__item">
          <p class="details__title">Phone</p>
          <input type="text" class="details__input" v-model="customer.phone" disabled />
        </li>
        <li class="details__item lg__item">
          <p class="details__title">Address</p>
          <input type="text" class="details__input" v-model="customer.address.street" disabled />
          <div class="details__input-container">
            <input type="text" class="details__input city-input" v-model="customer.address.city" disabled />
            <input type="text" class="details__input state-input" v-model="customer.address.state" disabled />
            <input type="number" class="details__input code-input" v-model="customer.address.zipCode" disabled />
          </div>
        </li>
      </ul>
    </div>
    <div class="details__right">
      <div class="details__info" v-if="customerDeals && customerDeals.length > 0">
        <p class="details__title">Recent Deals</p>
        <ul class="details__list">
          <li class="details__item" v-for="deal in customerDeals" :key="deal.id">
            <RouterLink :to="`/deal/${deal.id}`" class="item__link">
              <img :src="deal.image" alt="deal" class="item__image" />
              <div class="item__container">
                <h5 class="item__title">{{ deal.address.street }}, {{ deal.address.city }} {{ deal.address.state }}</h5>
                <div class="item__info">
                  <p class="item__text">{{ dayjs(deal.date).format('MMM DD, HH:MM') }}</p>
                  <p class="item__text">$ {{ deal.price }}</p>
                </div>
              </div>
            </RouterLink>
          </li>
        </ul>
        <button class="details__deals" v-if="customerDeals.length > 3">Load More</button>
      </div>
      <div class="details__no" v-else>
        <img src="/Deals.png" alt="no-deals" class="details__no-img" />
        <p class="details__no-descr">No deals found</p>
      </div>
    </div>
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

  <BaseModal :type="ModalType.DeleteDeal">
    <template #title>Delete Customer</template>
    <ConfirmDeleteModal v-if="selectedCustomer" :id="selectedCustomer.cid" @confirm="deleteCustomer" />
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.details {
  display: flex;
  &__left {
    @include flexbox-column;
    padding: 34px;
    flex: 1;
    & > .details__img-container {
      position: relative;
      width: 100%;
      min-height: 200px;
      @include flexbox-between;
      align-items: flex-end;
      background-image: url('/public/Cover.png');
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 12px;
      & > .details__img {
        width: 100px;
        height: 100px;
        border-radius: 90px;
        padding: 34px;
      }
      & > .details__edit {
        padding: 0;
        position: absolute;
        bottom: 33px;
        left: 103px;
        @include def-btn;
      }
      & > .details__delete {
        @include def-btn;
        margin: 34px;
        margin-right: 50px;
      }
    }
    & > .details__list {
      width: 100%;
      display: grid;
      grid-template-columns: minmax(200px, 655px) minmax(200px, 655px);
      grid-template-rows: repeat(4, minmax(92px, 150px));
      margin: 0;
      padding: 0;
      padding-top: 24px;
      list-style: none;
      gap: 34px;
      & > .details__item {
        @include flexbox-column;
        gap: 10px;
        & > .details__title {
          @include navy-descr;
          font-weight: 600;
        }
        & > .details__input {
          @include modal__input-styles;
        }
      }
      & > .lg__item {
        grid-column: span 2;
        & > .details__input-container {
          display: flex;
          gap: 20px;
          & > .details__input {
            @include modal__input-styles;
          }
          & > .city-input {
            width: 562px;
          }
          & > .state-input {
            width: 500px;
          }
          & > .code-input {
            width: 209px;
          }
        }
      }
    }
  }
  &__right {
    width: 517px;
    background-color: $blue-light;
    & > .details__info {
      padding: 34px;
      & > .details__title {
        @include navy-descr;
        font-weight: 600;
        margin-bottom: 28px;
      }
      & > .details__list {
        @include flexbox-column;
        gap: 20px;
        margin: 0;
        padding: 0;
        list-style: none;
        & > .details__item {
          & > .item__link {
            display: flex;
            gap: 10px;
            text-decoration: none;
            & > .item__image {
              @include image-count;
              width: 44px;
              height: 44px;
              padding: 0;
            }
            & > .item__container {
              @include flexbox-column;
              gap: 5px;
              & > .item__title {
                @include navy-descr;
                font-size: 20px;
              }
              & > .item__info {
                display: flex;
                gap: 10px;
                & > .item__text {
                  @include gray-descr;
                  font-size: 18px;
                }
              }
            }
          }
        }
      }
    }
    & > .details__deals {
      @include def-btn;
      color: $bluecolor;
      font-size: 24px;
    }
  }
  &__no {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: $gray-20;
    padding: 15px 24px;
    .details__no-img {
      width: 34px;
      height: 34px;
    }
    .details__no-descr {
      @include gray-descr;
    }
  }
}
</style>
