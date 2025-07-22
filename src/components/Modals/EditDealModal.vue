<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import { ref } from 'vue'
import CustomSelectField from '../CustomElements/CustomSelectField.vue'
import CustomFileUpload from '../CustomElements/CustomFileUpload.vue'
import type { IDeal } from '@/types/dealsType'
import { cloneDeep } from 'lodash-es'

const props = defineProps<{
  deal: IDeal
}>()
const emit = defineEmits<{
  (e: 'update:deal', value: IDeal): void
  (e: 'close'): void
}>()
const modalStore = useModalStore()
const editData = ref<IDeal>(cloneDeep(props.deal))
const saveChanges = () => {
  emit('update:deal', editData.value)
  emit('close')
}
</script>

<template>
  <div class="modal__main">
    <div class="modal__avatar">
      <p class="file__descr">Room Images</p>
      <CustomFileUpload v-model="editData.image" />
      <img v-if="editData.image" :src="editData.image" alt="Preview" class="modal__preview" />
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
    <div class="modal__advanced">
      <div class="modal__input-container">
        <p class="modal__title">Room Area(m2)</p>
        <input type="number" v-model="editData.area" class="modal__input" />
      </div>
      <div class="modal__input-container">
        <p class="modal__title"># of People</p>
        <input type="number" v-model="editData.numOfPeople" class="modal__input" />
      </div>
      <div class="modal__columns-full">
        <p class="modal__title">Appointment Date</p>
        <input type="date" class="modal__input-100" v-model="editData.date" />
      </div>
      <div class="modal__columns-full">
        <p class="modal__title">Special Instructions</p>
        <input type="text" class="modal__input-100" v-model="editData.instructions" />
      </div>
      <div class="modal__input-container">
        <p class="modal__title">Room Access</p>
        <input type="number" v-model="editData.accessCode" class="modal__input" />
      </div>
      <div class="modal__input-container">
        <p class="modal__title">Price</p>
        <input type="number" v-model="editData.price" class="modal__input" />
      </div>
    </div>
    <div class="modal__btn-progress">
      <div class="modal__progress">
        <p class="modal__title">Progress</p>
        <CustomSelectField v-model="editData.progress" />
      </div>
      <div class="modal__btn-wrapper">
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
  &__preview {
    @include image-count;
    padding: 0;
    align-self: self-start;
  }
}
.file__descr {
  @include navy-descr;
  font-weight: 600;
}
</style>
