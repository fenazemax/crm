<script setup lang="ts">
import { useDealStore } from '@/stores/dealsStore'
import { computed } from 'vue'

const dealStore = useDealStore()
const dealCount = computed(() => dealStore.deals.length)
</script>

<template>
  <div class="deal">
    <div class="deal__content">
      <p class="deal__descr">Deals</p>
      <p :class="dealCount === 0 ? 'deal__count-0' : 'deal__count'">{{ dealCount }}</p>
    </div>
    <img
      :src="dealCount > 0 ? './red-count.png' : './gray-count-deal.png'"
      alt="deal"
      :class="dealCount > 0 ? 'deal__image' : 'deal__image-0'"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.deal {
  display: flex;
  padding: 34px;
  gap: 50px;
  &__content {
    width: 175px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-right: 30px;
  }
  &__descr {
    font-size: 38px;
    color: $gray-70;
    font-weight: 700;
  }
  &__count-0 {
    @include counter-stat-0;
    color: $gray-70;
  }
  &__count {
    @include counter-stat-0;
    color: $navy;
  }
  &__image {
    @include image-count;
    background: linear-gradient(to bottom, rgba($primary-pink, 0.6), rgba($primary-pink, 0.01));
  }
  &__image-0 {
    @include image-count;
    background: linear-gradient(to bottom, rgba($gray-70, 0.6), rgba($gray-70, 0.01));
  }
}
</style>
