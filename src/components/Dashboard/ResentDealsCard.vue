<script setup lang="ts">
import { useDealStore } from '@/stores/dealsStore'
import { computed } from 'vue'
import dayjs from 'dayjs'

const dealStore = useDealStore()
const sortedDeals = computed(() =>
  dealStore.deals
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4),
)
</script>

<template>
  <div class="recent" v-if="sortedDeals.length > 0">
    <div class="recent__template">
      <p class="template__descr">Recent Deals</p>
      <router-link to="/deals" class="template__all-deals">View All</router-link>
    </div>
    <div class="recent__deals" v-for="deal in sortedDeals" :key="deal.id">
      <router-link :to="`/deal/${deal.id}`" class="solo-deal">
        <div class="solo-deal__content">
          <img :src="deal.image" alt="deal-img" class="content__img" />
          <div class="content__about">
            <h5 class="about__descr">{{ deal.address.street }}</h5>
            <p class="about__title">{{ deal.address.city + ',' + deal.address.state }}</p>
          </div>
        </div>
        <div class="solo-deal__advanced">
          <h5 class="solo-deal__price">${{ deal.price }}</h5>
          <p class="solo-deal__date">{{ dayjs(deal.date).format('MMM DD, HH:mm') }}</p>
        </div>
      </router-link>
    </div>
  </div>
  <div class="no-deals" v-else>
    <img src="./Deals.png" alt="no deals" class="no-deals__img" />
    <p class="no-deals__descr">No deals found.</p>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.recent {
  @include flexbox-column;
  padding: 34px;
  gap: 34px;
  &__template {
    display: flex;
    justify-content: space-between;

    & > .template__descr {
      font-size: 30px;
      font-weight: 700;
      color: $navy;
    }
    & > .template__all-deals {
      @include view-all;
    }
  }
}
.solo-deal {
  @include flexbox-between;
  text-decoration: none;
  &__content {
    @include flexbox-between;
    gap: 16px;
    & > .content__img {
      width: 54px;
      height: 54px;
    }
    & > .content__about {
      @include flexbox-column;
      & > .about__descr {
        @include navy-descr;
      }
      & > .about__title {
        @include gray-descr;
      }
    }
  }
  &__advanced {
    @include flexbox-column;
    & > .solo-deal__date {
      font-size: 20px;
      color: $gray-70;
    }
    & > .solo-deal__price {
      font-size: 24px;
      color: $navy;
    }
  }
}

.no-deals {
  width: 100%;
  height: 100%;
  @include flexbox-column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  &__img {
    width: 40px;
    height: 40px;
    align-self: center;
  }
  &__descr {
    font-size: 20px;
    color: $gray-70;
  }
}
</style>
