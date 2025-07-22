<script setup lang="ts">
import { useCustomerStore } from '@/stores/customerStore'

const customerStore = useCustomerStore()

const count = customerStore.customers.length
</script>

<template>
  <div class="customer">
    <div class="customer__content">
      <p class="customer__descr">Customers</p>
      <p :class="count === 0 ? 'customer__count-0' : 'customer__count'">{{ count }}</p>
    </div>
    <img
      :src="count > 0 ? './green-count.png' : './gray-count.png'"
      alt="customer"
      :class="count > 0 ? 'customer__image' : 'customer__image-0'"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.customer {
  display: flex;
  padding: 34px;
  gap: 50px;
  &__descr {
    font-size: 38px;
    color: $gray-70;
    font-weight: 700;
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-right: 30px;
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
    background: linear-gradient(to bottom, rgba($primary-green, 0.6), rgba($primary-green, 0.01));
  }
  &__image-0 {
    @include image-count;
    background: linear-gradient(to bottom, rgba($gray-70, 0.6), rgba($gray-70, 0.01));
  }
}
</style>
