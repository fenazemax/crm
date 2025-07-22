<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import CustomFileUpload from '../CustomElements/CustomFileUpload.vue'
import { computed, ref } from 'vue'
import CustomSelectField from '../CustomElements/CustomSelectField.vue'
import { EnumProgress, type IDeal } from '@/types/dealsType'
import { useCustomerStore } from '@/stores/customerStore'
import { ModalType } from '@/types/modalType'
import SelectCustomerModal from './SelectCustomerModal.vue'
import BaseModal from './BaseModal.vue'
import { useDealStore } from '@/stores/dealsStore'

const modalStore = useModalStore()
const customerStore = useCustomerStore()
const dealStore = useDealStore()

const selectedProgress = ref(EnumProgress.new)
const avatarInput = ref('')
const streetInput = ref<string>('')
const cityInput = ref<string>('')
const stateInput = ref<string>('')
const areaInput = ref<string>('')
const instructionsInput = ref<string>('')
const numOfPeopleInput = ref<string>('')
const zipCodeInput = ref<number | null>(null)
const dateInput = ref<Date | undefined>()
const accessInput = ref<string>('')
const priceInput = ref<string>('')
const customer = ref(customerStore.customers[0])
const customerFullName = computed(() => {
  return `${customer.value.name} ${customer.value.secondname}`
})

const selectCustomer = () => {
  modalStore.openModal(ModalType.ChangeCustomer)
}

const resetForm = () => {
  avatarInput.value = ''
  streetInput.value = ''
  cityInput.value = ''
  stateInput.value = ''
  areaInput.value = ''
  instructionsInput.value = ''
  numOfPeopleInput.value = ''
  zipCodeInput.value = null
  dateInput.value = undefined
  accessInput.value = ''
  priceInput.value = ''
  selectedProgress.value = EnumProgress.new
}

const saveDeal = () => {
  if (
    !dateInput.value ||
    !cityInput.value ||
    !stateInput.value ||
    !streetInput.value ||
    !zipCodeInput.value ||
    !priceInput.value
  ) {
    throw new Error('All fields required')
  }
  const newDeal: IDeal = {
    id: Date.now(),
    customer: customer.value,
    image: avatarInput.value || '/NoImage.png',
    address: {
      city: cityInput.value,
      street: streetInput.value,
      state: stateInput.value,
      zipCode: Number(zipCodeInput.value),
    },
    area: Number(areaInput.value),
    numOfPeople: Number(numOfPeopleInput.value),
    date: dateInput.value,
    instructions: instructionsInput.value,
    accessCode: accessInput.value,
    price: Number(priceInput.value),
    progress: selectedProgress.value,
  }
  dealStore.addDeal(newDeal, customer.value.cid)
  customerStore.addDealToCustomer(newDeal, customer.value.cid)
  resetForm()
  modalStore.closeModal()
}
</script>

<template>
  <div class="modal__customer">
    <div class="customer__about">
      <img :src="customer.avatar" alt="customer-avatar" class="customer__img" />
      <div class="customer__descr">
        <p class="customer__title">Customer</p>
        <p class="customer__name">{{ customerFullName }}</p>
      </div>
    </div>
    <button class="customer__btn" @click="selectCustomer">Change Customer</button>
  </div>
  <div class="modal__main">
    <div class="modal__avatar">
      <p class="file__descr">Room Images</p>
      <CustomFileUpload v-model="avatarInput" />
      <img v-if="avatarInput" :src="avatarInput" alt="Preview" class="modal__preview" />
    </div>
    <div class="modal__address">
      <p class="modal__title">Address</p>
      <input type="text" class="modal__street" placeholder="Street Address" v-model="streetInput" />
      <div class="modal__address-other">
        <input type="text" class="modal__city" placeholder="City" v-model="cityInput" />
        <input type="text" class="modal__state" placeholder="State/Province" v-model="stateInput" />
        <input type="number" class="modal__code" placeholder="Zip Code" v-model="zipCodeInput" />
      </div>
    </div>
    <div class="modal__advanced">
      <div class="modal__input-container">
        <p class="modal__title">Room Area(m2)</p>
        <input type="number" v-model="areaInput" class="modal__input" />
      </div>
      <div class="modal__input-container">
        <p class="modal__title"># of People</p>
        <input type="number" v-model="numOfPeopleInput" class="modal__input" />
      </div>
      <div class="modal__columns-full">
        <p class="modal__title">Appointment Date</p>
        <input type="date" class="modal__input-100" v-model="dateInput" />
      </div>
      <div class="modal__columns-full">
        <p class="modal__title">Special Instructions</p>
        <input type="text" class="modal__input-100" v-model="instructionsInput" />
      </div>
      <div class="modal__input-container">
        <p class="modal__title">Room Access</p>
        <input type="number" v-model="accessInput" class="modal__input" />
      </div>
      <div class="modal__input-container">
        <p class="modal__title">Price</p>
        <input type="number" v-model="priceInput" class="modal__input" />
      </div>
    </div>
    <div class="modal__btn-progress">
      <div class="modal__progress">
        <p class="modal__title">Progress</p>
        <CustomSelectField v-model="selectedProgress" />
      </div>
      <div class="modal__btn-wrapper">
        <button class="modal__btn-cancel" @click="modalStore.closeModal">Cancel</button>
        <button class="modal__btn-save" @click="saveDeal">Save Deal</button>
      </div>
    </div>
  </div>

  <BaseModal :type="ModalType.ChangeCustomer">
    <template #title>Select Customer</template>
    <SelectCustomerModal v-model="customer" />
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.modal {
  &__main {
    @include flexbox-column;
    padding: 24px 32px;
    gap: 20px;
  }

  &__title {
    @include navy-descr;
    font-weight: 600;
  }
  &__customer {
    @include flexbox-between;
    padding: 18px 32px;
    background-color: $gray-30;
    & > .customer__about {
      display: flex;
      gap: 15px;
      & > .customer__img {
        width: 54px;
        height: 54px;
        border-radius: 25px;
      }
      & > .customer__descr {
        @include flexbox-column;
        & > .customer__title {
          @include gray-descr;
        }
        & > .customer__name {
          @include navy-descr;
          font-weight: 600;
          font-size: 22px;
        }
      }
    }
    & > .customer__btn {
      background-color: $colorwhite;
      border: none;
      border-radius: 70px;
      padding: 10px 29px;
      font-size: 16px;
      color: $navy;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        outline: 1px solid $gray-90;
      }
      &:focus {
        outline: 1px solid $gray-70;
      }
      &:active {
        background-color: $gray-70;
        color: $gray-10;
      }
    }
  }
  &__avatar {
    @include flexbox-column;
    gap: 10px;
    margin-bottom: 20px;
  }
  &__title {
    @include navy-descr;
    font-weight: 600;
  }
  &__address {
    @include flexbox-column;
    margin-bottom: 20px;
    gap: 10px;
    & > .modal__street {
      width: 95%;
      height: 50%;
      @include modal__input-styles;
    }
    & > .modal__address-other {
      display: flex;
      height: 50px;
      gap: 20px;
      & > .modal__city,
      .modal__state,
      .modal__code {
        height: 38px;
        @include modal__input-styles;
      }
      & > .modal__city {
        width: 223px;
      }
      & > .modal__state {
        width: 136px;
      }
      & > .modal__code {
        width: 88px;
      }
    }
  }
  &__advanced {
    display: grid;
    grid-template-columns: 268px 268px;
    grid-template-rows: repeat(4, 92px);
    gap: 20px;
  }
  &__input-container {
    @include flexbox-column;
    gap: 10px;
    & > .modal__input {
      width: 90%;
      height: 50%;
      @include modal__input-styles;
    }
  }
  &__columns-full {
    @include flexbox-column;
    gap: 10px;
    grid-column: span 2;
    & > .modal__input-100 {
      color: $gray-70;
      @include modal__input-styles;
    }
  }
  &__btn-progress {
    display: flex;
    justify-content: space-between;
  }
  &__btn-wrapper {
    display: flex;
    & > .modal__btn-cancel {
      @include modal-cancel-btn;
    }
    & > .modal__btn-save {
      @include modal-save-btn;
    }
  }
}
.file__descr {
  @include navy-descr;
  font-weight: 600;
}
</style>
