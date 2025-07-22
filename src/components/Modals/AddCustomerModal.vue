<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import { useCustomerStore } from '@/stores/customerStore'
import { computed, ref } from 'vue'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import CustomFileUpload from '../CustomElements/CustomFileUpload.vue'
import { useEventListener } from '@vueuse/core'

const modalStore = useModalStore()
const customerStore = useCustomerStore()

const firstNameInput = ref<string>('')
const secondNameInput = ref<string>('')

const emailInput = ref<string>('')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailTouched = ref(false)

const phoneInput = ref<string>('')
const isValidPhone = computed(() => {
  const phoneNumber = parsePhoneNumberFromString(phoneInput.value, 'US')
  return phoneNumber?.isValid() ?? false
})
const streetInput = ref<string>('')
const cityInput = ref<string>('')
const stateInput = ref<string>('')
const zipCodeInput = ref<number | null>(null)
const avatarInput = ref<string>('')

const emailError = computed(() => {
  if (!emailTouched.value) return ''
  if (!emailInput.value) return 'Email is required'
  if (!emailRegex.test(emailInput.value)) return 'Invalid email format'
  return ''
})

const validateEmail = () => {
  emailTouched.value = true
}

const closeModal = () => {
  modalStore.closeModal()
}

const saveCustomer = () => {
  if (
    !phoneInput.value ||
    !firstNameInput.value ||
    !secondNameInput.value ||
    !emailInput.value ||
    !cityInput.value ||
    !streetInput.value ||
    !stateInput.value ||
    !zipCodeInput.value
  )
    return
  customerStore.addCustomer({
    cid: Date.now(),
    avatar: avatarInput.value || '/NoImage.png',
    name: firstNameInput.value,
    secondname: secondNameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    address: {
      city: cityInput.value,
      street: streetInput.value,
      state: stateInput.value,
      zipCode: Number(zipCodeInput.value),
    },
    deals: [],
  })
  closeModal()
}

useEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal()
})
</script>

<template>
  <div class="modal__main">
    <div class="modal__avatar">
      <p class="file__descr">Avatar</p>
      <CustomFileUpload v-model="avatarInput" />
      <img v-if="avatarInput" :src="avatarInput" alt="Preview" class="modal__preview" />
    </div>
    <div class="modal__customer">
      <div class="modal__name">
        <p class="modal__title">First Name</p>
        <input type="text" class="modal__input" v-model="firstNameInput" />
      </div>
      <div class="modal__lastname">
        <p class="modal__title">Last Name</p>
        <input type="text" class="modal__input" v-model="secondNameInput" />
      </div>
      <div class="modal__mail">
        <p class="modal__title">Email</p>
        <input type="email" class="modal__input" v-model="emailInput" @blur="validateEmail" />
        <p class="input__error" v-if="emailError && emailInput.length > 5">{{ emailError }}</p>
      </div>
      <div class="modal__phone">
        <p class="modal__title">Phone</p>
        <input type="text" class="modal__input" v-model="phoneInput" />
        <p class="input__error" v-if="isValidPhone === false && phoneInput.length > 5">
          Wrong number format, please use US-format number
        </p>
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
    </div>
    <div class="modal__btnWrapper">
      <button class="modal__btn-cancel" @click="closeModal">Cancel</button>
      <button class="modal__btn-save" @click="saveCustomer">Save Customer</button>
    </div>
  </div>
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
    display: grid;
    grid-template-columns: 268px 268px;
    grid-template-rows: 92px 92px;
    gap: 20px;
    & > .modal__name,
    .modal__lastname,
    .modal__mail,
    .modal__phone {
      @include flexbox-column;
      gap: 12px;
      & > .modal__input {
        width: 90%;
        height: 50%;
        @include modal__input-styles;
      }
    }
  }
  &__address {
    @include flexbox-column;
    grid-column: span 2;
    grid-row: span 2;
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
  &__btnWrapper {
    display: flex;
    justify-content: flex-end;

    margin: 16px 32px;
    & > .modal__btn-cancel {
      width: 35%;
      @include modal-cancel-btn;
    }
    & > .modal__btn-save {
      width: 35%;
      @include modal-save-btn;
    }
  }
}
.file__descr {
  @include navy-descr;
  font-weight: 600;
}
</style>
