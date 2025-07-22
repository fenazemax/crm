<script setup lang="ts">
import { useCustomerStore } from '@/stores/customerStore'
import { computed } from 'vue'

const customerStore = useCustomerStore()

const firstThreeCustomers = computed(() => {
  return customerStore.customers.slice(0, 3)
})
</script>

<template>
  <div class="display" v-if="firstThreeCustomers.length > 0">
    <div class="display__view">
      <h5 class="display__title">Customers</h5>
      <router-link to="/customers" class="display__link">View All</router-link>
    </div>
    <div class="customer__container">
      <div class="display__customers" v-for="customer in firstThreeCustomers" :key="customer.cid">
        <img :src="customer.avatar" alt="avatar" class="display__img" />
        <div class="display__descr">
          <h5 class="display__text">{{ customer.name }} {{ customer.secondname }}</h5>
          <p class="display__email">{{ customer.email }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="no-display" v-else>
    <div class="no-display__container">
      <img src="/Customers.png" alt="no-customers" class="no-display__img" />
      <p class="no-display__descr">No customers found.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.display {
  padding: 34px;
  @include flexbox-column;
  .customer__container {
    @include flexbox-column;
    gap: 20px;
  }
  &__view {
    @include flexbox-between;
    padding-bottom: 34px;
    & > .display__title {
      font-size: 30px;
      font-weight: 700;
      color: #092c4c;
    }
    & > .display__link {
      @include view-all;
    }
  }
  &__customers {
    display: flex;
    gap: 34px;
    & > .display__img {
      width: 54px;
      height: 54px;
      border-radius: 25px;
    }
    & > .display__descr {
      @include flexbox-column;
      & > .display__text {
        @include navy-descr;
      }
      & > .display__email {
        @include gray-descr;
      }
    }
  }
}

.no-display {
  padding: 34px;
  &__container {
    display: flex;
    gap: 15px;
    padding: 34px;
    background-color: $colorwhite;
    border-radius: 12px;
    align-items: center;
  }
  &__img {
    width: 34px;
    height: 34px;
  }
  &__descr {
    @include gray-descr;
  }
}
</style>
