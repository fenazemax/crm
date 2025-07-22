<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import type { ICustomer } from '@/types/customerType'
import { computed, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import parsePhoneNumberFromString from 'libphonenumber-js/min'
import CustomFileUpload from '../CustomElements/CustomFileUpload.vue'

const props = defineProps<{
  customer: ICustomer
}>()

const emit = defineEmits<{
  (e: 'update:customer', value: ICustomer): void
  (e: 'close'): void
}>()

const modalStore = useModalStore()

const editData = ref<ICustomer>(cloneDeep(props.customer))
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailTouched = ref(false)

const isValidPhone = computed(() => {
  const phoneNumber = parsePhoneNumberFromString(editData.value.phone, 'US')
  return phoneNumber?.isValid() ?? false
})
const emailError = computed(() => {
  if (!emailTouched.value) return ''
  if (!editData.value.email) return 'Email is required'
  if (!emailRegex.test(editData.value.email)) return 'Invalid email format'
  return ''
})

const validateEmail = () => {
  emailTouched.value = true
}
const saveChanges = () => {
  emit('update:customer', editData.value)
  emit('close')
}
</script>

<template>
  <div class="modal__main">
    <div class="modal__avatar">
      <p class="file__descr">Room Images</p>
      <CustomFileUpload v-model="editData.avatar" />
      <img v-if="editData.avatar" :src="editData.avatar" alt="Preview" class="modal__preview" />
    </div>
    <div class="modal__customer">
      <div class="modal__name">
        <p class="modal__title">First Name</p>
        <input type="text" class="modal__input" v-model="editData.name" />
      </div>
      <div class="modal__lastname">
        <p class="modal__title">Last Name</p>
        <input type="text" class="modal__input" v-model="editData.secondname" />
      </div>
      <div class="modal__mail">
        <p class="modal__title">Email</p>
        <input type="email" class="modal__input" v-model="editData.email" @blur="validateEmail" />
        <p class="input__error" v-if="emailError && editData.email.length > 5">{{ emailError }}</p>
      </div>
      <div class="modal__phone">
        <p class="modal__title">Phone</p>
        <input type="text" class="modal__input" v-model="editData.phone" />
        <p class="input__error" v-if="isValidPhone === false && editData.phone.length > 5">
          Wrong number format, please use US-format number
        </p>
      </div>
      <div class="modal__address">
        <p class="modal__title">Address</p>
        <input type="text" class="modal__street" placeholder="Street Address" v-model="editData.address.street" />
        <div class="modal__address-other">
          <input type="text" class="modal__city" placeholder="City" v-model="editData.address.city" />
          <input type="text" class="modal__state" placeholder="State/Province" v-model="editData.address.state" />
          <input type="number" class="modal__code" placeholder="Zip Code" v-model="editData.address.zipCode" />
        </div>
      </div>
      <div class="modal__btnWrapper">
        <button class="modal__btn-cancel" @click="modalStore.closeModal">Cancel</button>
        <button class="modal__btn-save" @click="saveChanges">Done</button>
      </div>
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
    justify-content: center;
    grid-column: span 2;
    gap: 20px;
    margin: 16px 32px;
    & > .modal__btn-cancel {
      @include modal-cancel-btn;
    }
    & > .modal__btn-save {
      @include modal-save-btn;
    }
  }
  &__preview {
    padding: 10px;
    border-radius: 70px;
  }
}
.file__descr {
  @include navy-descr;
  font-weight: 600;
}
</style>
