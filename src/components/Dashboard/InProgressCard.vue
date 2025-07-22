<script setup lang="ts">
import { useDealStore } from '@/stores/dealsStore'
import { computed } from 'vue'
import { EnumProgress } from '@/types/dealsType'
import StatusArrowIcon from '../Icons/StatusArrowIcon.vue'
import CommentsIcon from '../Icons/CommentsIcon.vue'
import dayjs from 'dayjs'

const dealStore = useDealStore()
const firstDealInProgress = computed(() => {
  return dealStore.deals
    .filter((d) => d.progress === EnumProgress['in-progress'])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]
})
const formatedAddress = computed(() => {
  const a = firstDealInProgress.value.address
  return `${a.city}, ${a.state} ${a.zipCode}`
})
</script>

<template>
  <div class="current" v-if="firstDealInProgress">
    <div class="current__deal">
      <div class="current__content">
        <img :src="firstDealInProgress.image" alt="" class="current__img" />
        <div class="current__text">
          <h5 class="current__title">{{ firstDealInProgress.address.street }}</h5>
          <p class="current__descr">{{ formatedAddress }}</p>
        </div>
      </div>
      <RouterLink :to="`/deal/${firstDealInProgress.id}`" class="current__link">
        <p class="current__status">{{ firstDealInProgress.progress }}</p>
        <StatusArrowIcon />
      </RouterLink>
    </div>
    <div class="current__actions">
      <div class="current__comments" v-for="comment in firstDealInProgress.comments" :key="comment.id">
        <div class="comments__content">
          <CommentsIcon />
          <div class="comments__text">
            <p class="comments__date">{{ dayjs(comment.date).format('DD MMM YYYY') }}</p>
            <p class="comments__descr">{{ comment.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="no-current" v-else>
    <div class="no-current__wrapper">
      <img src="/Calendar.png" alt="no-deals" class="wrapper__img" />
      <p class="wrapper__descr">No deals in progress</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.current {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  &__deal {
    @include flexbox-between;
    padding: 34px;
    padding-bottom: 26px;
    border-bottom: 1px solid $bg-sidebar;
  }
  &__content {
    display: flex;
    gap: 16px;
    & > .current__img {
      width: 54px;
      height: 54px;
    }
  }
  &__text {
    @include flexbox-column;
    & > .current__title {
      @include navy-descr;
    }
    & > .current__descr {
      font-size: 20px;
      @include gray-descr;
    }
  }
  &__link {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    & > .current__status {
      width: 120px;
      padding: 15px 25px;
      background-color: $blue-light;
      color: $bluecolor;
      font-size: 20px;
      font-weight: 600;
      border-radius: 100px;
      text-align: center;
    }
  }
  &__actions {
    padding: 38px;
    @include flexbox-column;
    gap: 38px;
  }
  &__comments {
    @include flexbox-column;
    & > .comments__content {
      display: flex;
      gap: 21px;
      & > .comments__text {
        @include flexbox-column;
        & > .comments__date {
          @include gray-descr;
        }
        & > .comments__descr {
          @include navy-descr;
        }
      }
    }
  }
}

.no-current {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  &__wrapper {
    @include flexbox-column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    & > .wrapper__img {
      width: 34px;
      height: 34px;
    }
    & > .wrapper__descr {
      color: $gray-70;
      font-size: 22px;
    }
  }
}
</style>
