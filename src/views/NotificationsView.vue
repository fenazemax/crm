<script setup lang="ts"></script>

<template>
  <div class="no-notifications">
    <img src="/Notification.png" alt="Notification" class="no-notifications__img" />
    <p class="no-notifications__descr">Notifications coming soon</p>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.no-notifications {
  position: absolute;
  display: flex;
  align-items: center;
  top: 40%;
  left: 40%;
  gap: 20px;
  user-select: none;
  &__img {
    width: 34px;
    height: 34px;
  }
  &__descr {
    @include gray-descr;
    font-size: 24px;
  }
}
</style>
