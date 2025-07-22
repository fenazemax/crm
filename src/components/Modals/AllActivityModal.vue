<script setup lang="ts">
import { useDealStore } from '@/stores/dealsStore'
import dayjs from 'dayjs'
import { computed } from 'vue'
import CommentsIcon from '../Icons/CommentsIcon.vue'

const props = defineProps<{
  id: number
}>()
const dealStore = useDealStore()
const deal = dealStore.deals.find((d) => d.id === props.id)
const commentsLength = computed(() => deal?.comments?.length)
</script>

<template>
  <div class="activity" v-if="deal && commentsLength !== undefined && commentsLength > 0">
    <ul class="activity__list">
      <li class="activity__item" v-for="comment in deal.comments" :key="comment.id">
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
  </div>
  <div class="no-activity" v-else>
    <p class="activity__title">No activities found</p>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.activity,
.no-activity {
  padding: 24px;
  @include flexbox-column;
  &__title {
    @include navy-descr;
  }
  &__list {
    @include flexbox-column;
    padding: 0;
    margin: 0;
    list-style: none;
    gap: 24px;
    overflow-y: auto;
    & > .activity__item {
      @include flexbox-column;
      align-items: flex-start;
    }
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
      width: 116px;
      height: 86px;
    }
  }
}
</style>
