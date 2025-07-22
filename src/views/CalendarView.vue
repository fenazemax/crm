<script setup lang="ts"></script>

<template>
  <div class="no-calendar">
    <img src="./Calendar.png" alt="calendar" class="no-calendar__img" />
    <p class="no-calendar__descr">Calendar coming soon</p>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.no-calendar {
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
