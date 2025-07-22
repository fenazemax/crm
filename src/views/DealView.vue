<script setup lang="ts">
import DeleteIcon from '@/components/Icons/DeleteIcon.vue'
import { useDealStore } from '@/stores/dealsStore'
import { computed, ref } from 'vue'
import type { IDeal, TComments } from '@/types/dealsType'
import { useModalStore } from '@/stores/modalStore'
import { ModalType } from '@/types/modalType'
import EditDealIcon from '@/components/Icons/EditDealIcon.vue'
import BaseModal from '@/components/Modals/BaseModal.vue'
import EditDealModal from '@/components/Modals/EditDealModal.vue'
import ConfirmDeleteModal from '@/components/Modals/ConfirmDeleteModal.vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import CustomFileUpload from '@/components/CustomElements/CustomFileUpload.vue'
import { useCommentStore } from '@/stores/commentStore'
import AllActivityModal from '@/components/Modals/AllActivityModal.vue'
import CommentsIcon from '@/components/Icons/CommentsIcon.vue'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const dealStore = useDealStore()
const modalStore = useModalStore()
const comStore = useCommentStore()
const deal = dealStore.deals.find((d) => d.id === Number(props.id))

const formatedCustomer = computed(() => `${deal!.customer.name} ${deal!.customer.secondname}`)
const formatedAddress = computed(
  () => `${deal!.address.street}, ${deal!.address.city}, ${deal!.address.state} ${deal!.address.zipCode}`,
)
const formatedComments = computed(() => comStore.comments.slice(0, 3))
const comLength = computed(() => deal?.comments?.length)

const selectedDeal = ref<IDeal | null>(null)
const comTextInput = ref<string>('')
const comImageInput = ref<string>('')
const comDateInput = ref<string>(dayjs().format('YYYY-MM-DD'))

const openEditModal = (deal: IDeal) => {
  modalStore.openModal(ModalType.EditModal)
  selectedDeal.value = deal
}
const openDeleteModal = (deal: IDeal) => {
  modalStore.openModal(ModalType.DeleteDeal)
  selectedDeal.value = deal
}
const openLogModal = (deal: IDeal) => {
  modalStore.openModal(ModalType.Activity)
  selectedDeal.value = deal
}
const updateDeal = (updatedDeal: IDeal) => {
  dealStore.updateDeal(updatedDeal)
  selectedDeal.value = null
  modalStore.closeModal()
}

const deleteDeal = (dealId: number) => {
  try {
    dealStore.deleteDeal(dealId, deal!.customer.cid)
    selectedDeal.value = null
    modalStore.closeModal()
    router.push('/deals')
  } catch (error) {
    console.error('Error deleting deal:', error)
  }
}

const addActivity = () => {
  const newCom: TComments = {
    id: Date.now(),
    date: new Date(comDateInput.value),
    text: comTextInput.value,
    image: comImageInput.value,
  }
  try {
    if (deal && newCom.text && newCom.date) {
      deal.comments?.push(newCom)
      comStore.comments.push(newCom)
    }
  } catch (error) {
    console.error('Error adding activity:', error)
  }
}
</script>

<template>
  <div class="details" v-if="deal">
    <div class="details__left">
      <ul class="details__customer">
        <li class="details__customer-item">
          <p class="details__name">Customer</p>
          <p class="details__customer-info">{{ formatedCustomer }}</p>
        </li>
        <li class="details__customer-item">
          <p class="details__name">Email</p>
          <p class="details__customer-info">{{ deal.customer.email }}</p>
        </li>
        <li class="details__customer-item">
          <p class="details__name">Phone</p>
          <p class="details__customer-info">{{ deal.customer.phone }}</p>
        </li>
      </ul>
      <div class="details__main-info">
        <div class="details__address">
          <h5 class="details__title">{{ formatedAddress }}</h5>
          <div class="details__wrapper">
            <button class="details__delete" @click="openDeleteModal(deal)">
              <DeleteIcon />
            </button>
            <button class="details__edit" @click="openEditModal(deal)">
              <EditDealIcon />
            </button>
          </div>
        </div>
      </div>
      <div class="details__other-info">
        <ul class="details__info">
          <li class="details__item">
            <p class="details__name">Progress</p>
            <h5 class="details__about">{{ deal.progress }}</h5>
          </li>
          <li class="details__item">
            <p class="details__name">Appointment Date</p>
            <h5 class="details__about">{{ dayjs(deal.date).format('MMM DD, YYYY HH:mm') }}</h5>
          </li>
          <li class="details__item">
            <p class="details__name">Room Area</p>
            <h5 class="details__about">{{ deal.area }}</h5>
          </li>
          <li class="details__item">
            <p class="details__name">Number of People</p>
            <h5 class="details__about">{{ deal.numOfPeople }}</h5>
          </li>
          <li class="details__item">
            <p class="details__name">Price</p>
            <h5 class="details__about">{{ deal.price }}$</h5>
          </li>
          <li class="details__item">
            <p class="details__name">Room Access</p>
            <h5 class="details__about">{{ deal.accessCode }}</h5>
          </li>
          <li class="detail__item-xl">
            <p class="details__name">Special Instructions</p>
            <h5 class="details__about-xl">{{ deal.instructions }}</h5>
          </li>
        </ul>
        <img :src="deal.image" alt="deal img" class="details__img" />
      </div>
    </div>
    <div class="details__right">
      <div class="details__rec-activity">
        <h5 class="rec__title">Record Activity</h5>
        <div class="rec__descr">
          <p class="rec__title">Description</p>
          <input type="text" class="rec__input" placeholder="Write your notes" v-model="comTextInput" />
          <input type="date" class="rec__input" v-model="comDateInput" />
          <div class="rec__img-container">
            <p class="rec__title">Images</p>
            <CustomFileUpload v-model="comImageInput" />
          </div>
        </div>
        <button class="rec__btn" @click="addActivity">Save</button>
      </div>
      <div class="details__log" v-if="comLength && comLength > 0">
        <h5 class="rec__title">Activity Log</h5>
        <ul class="log__content">
          <li class="log__item" v-for="comment in formatedComments" :key="comment.id">
            <div class="log__info">
              <CommentsIcon />
              <div class="log__descr">
                <p class="log__date">{{ dayjs(comment.date).format('DD MMM YYYY') }}</p>
                <p class="log__text">{{ comment.text }}</p>
              </div>
            </div>
            <img v-if="comment.image" :src="comment.image" alt="comment image" class="log__img" />
          </li>
        </ul>
        <button class="log__btn" @click="openLogModal(deal)">Load More</button>
      </div>
      <div class="details__log" v-else>
        <h5 class="rec__title">Activity Log</h5>
        <div class="no-log__descr">
          <p class="no-log__text">No activities found for this deal</p>
          <p class="no-log__text">You can add activity in form on top</p>
        </div>
      </div>
    </div>
  </div>

  <BaseModal :type="ModalType.EditModal">
    <template #title>Edit Deal</template>
    <EditDealModal v-if="selectedDeal" :deal="selectedDeal" @update:deal="updateDeal" @close="selectedDeal = null" />
  </BaseModal>

  <BaseModal :type="ModalType.DeleteDeal">
    <template #title>Deleting Deal</template>
    <ConfirmDeleteModal v-if="selectedDeal" :id="selectedDeal.id" @confirm="deleteDeal" />
  </BaseModal>

  <BaseModal :type="ModalType.Activity">
    <template #title>All activities</template>
    <AllActivityModal v-if="selectedDeal" :id="selectedDeal.id" />
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.details {
  display: flex;

  &__left {
    flex: 1;
    @include flexbox-column;
    & > .details__customer {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      gap: 54px;
      justify-content: center;
      & > .details__customer-item {
        max-width: 254px;
        @include flexbox-column;
        gap: 5px;
        padding: 54px;
        & > .details__customer-info {
          @include navy-descr;
          font-weight: 600;
        }
      }
    }
  }
  &__main-info {
    @include flexbox-column;
    background-color: $colorwhite;
    padding: 24px 54px;
    & > .details__address {
      @include flexbox-between;
      & > .details__title {
        max-width: 350px;
        @include navy-descr;
        font-size: 30px;
      }
      & > .details__wrapper {
        display: flex;
        gap: 20px;
        & > .details__delete,
        .details__edit {
          background-color: transparent;
          border: none;
          cursor: pointer;
        }
      }
    }
  }
  &__other-info {
    display: flex;
    gap: 104px;
    padding-top: 20px;
    padding-left: 50px;
    & > .details__info {
      display: grid;
      grid-template-columns: minmax(100px, 312px) minmax(100px, 312px);
      grid-template-rows: repeat(4, minmax(60px, 100px));
      gap: 24px;
      margin: 0;
      padding: 0;
      list-style: none;
      & > .details__item {
        @include flexbox-column;
        align-items: center;
        gap: 10px;
        & > .details__about {
          @include navy-descr;
          font-weight: 600;
        }
      }
      & > .detail__item-xl {
        grid-column: span 2;
        @include flexbox-column;
        gap: 10px;
        & > .details__about-xl {
          @include gray-descr;
          color: $gray-90;
        }
      }
    }
    & > .details__img {
      align-self: center;
      width: 320px;
      height: 320px;
    }
  }
  &__name {
    @include gray-descr;
  }
  &__right {
    width: 409px;
    height: 100vh;
    @include flexbox-column;
    gap: 34px;
    padding: 54px;
    background-color: $blue-light;
    & > .details__rec-activity {
      @include flexbox-column;
      gap: 24px;
      background-color: $gray-10;
      padding: 34px;
      border-radius: 12px;
      & > .rec__descr {
        @include flexbox-column;
        gap: 10px;
        & > .rec__input {
          @include modal__input-styles;
          color: $gray-70;
        }
        & > .rec__img-container {
          @include flexbox-column;
          gap: 10px;
        }
      }
      & > .rec__btn {
        @include modal-save-btn;
      }
    }
    .rec__title {
      @include navy-descr;
      font-weight: 600;
    }
    & > .details__log {
      @include flexbox-column;
      gap: 24px;
      & > .log__content {
        @include flexbox-column;
        padding: 0;
        margin: 0;
        list-style: none;
        gap: 24px;
        & > .log__item {
          @include flexbox-column;
          align-items: flex-start;
          & > .log__info {
            display: flex;
            gap: 23px;
            & > .log__descr {
              @include flexbox-column;
              gap: 5px;
              & > .log__date {
                @include gray-descr;
                font-size: 20px;
              }
              & > .log__text {
                @include navy-descr;
                font-size: 20px;
              }
            }
          }
          & > .log__img {
            width: 316px;
            height: 186px;
          }
        }
      }
      & > .log__btn {
        @include def-btn;
        font-size: 20px;
        color: $bluecolor;
      }
      & > .no-log__descr {
        @include flexbox-column;
        align-items: center;
        gap: 34px;
        & > .no-log__text {
          font-size: 24px;
          color: $gray-90;
        }
      }
    }
  }
}
</style>
