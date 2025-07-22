<script setup lang="ts">
import { useDealStore } from '@/stores/dealsStore'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const router = useRouter()
const dealStore = useDealStore()

const newDeal = computed(() => dealStore.deals[0]) // возвращает правый операнд, если левый — null или undefined, иначе возвращает левый.
const formatedAddress = computed(() => {
  const a = newDeal.value.address
  return `${a.city}, ${a.state} ${a.zipCode}`
})
const formatedDate = computed(() => dayjs(newDeal.value.date).format('MMM DD YYYY, HH:mm'))
const isLoading = ref(false)
const openDealDetails = async () => {
  isLoading.value = true
  const id = newDeal.value.id
  await new Promise((res) => setTimeout(res, 1000))
  isLoading.value = false
  router.push(`/deal/${id}`)
}
</script>

<template>
  <div class="next-deal" v-if="dealStore.deals.length > 0">
    <p class="next-deal__descr">Next Appointment</p>
    <div class="next-deal__content">
      <div class="next-deal__shortcut-template">
        <img :src="newDeal.image" alt="deal-img" class="next-deal__img" />
        <div class="address">
          <h5 class="address__title">{{ newDeal.address.street }}</h5>
          <p class="address__descr">{{ formatedAddress }}</p>
        </div>
      </div>
      <div class="date">
        <p class="recent__descr">Appointment Date</p>
        <h5 class="recent__about">{{ formatedDate }}</h5>
      </div>
      <div class="next-deal__area-people">
        <div class="room-area">
          <p class="recent__descr">Room Area</p>
          <h5 class="recent__about">{{ newDeal.area }} M<sup>2</sup></h5>
        </div>
        <div class="people">
          <p class="recent__descr">People</p>
          <h5 class="recent__about">{{ newDeal.numOfPeople }}</h5>
        </div>
      </div>
      <div class="next-deal__price-advanced">
        <div class="price">
          <p class="recent__descr">Price</p>
          <h5 class="recent__about">${{ newDeal.price }}</h5>
        </div>
        <button class="advanced-btn btn-pointer" @click="openDealDetails">
          <span v-if="isLoading">Loading...</span>
          <span v-else>See Detail</span>
        </button>
      </div>
    </div>
  </div>
  <div class="no-deals" v-else>
    <div class="no-deals__wrapper">
      <img src="./Calendar.png" alt="no-deals" class="no-deals__img" />
      <p class="no-deals__descr">No upcoming appointments</p>
    </div>
    <button class="advanced-btn btn-pointer position-btn">Add deal?</button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.next-deal {
  @include flexbox-column;
  gap: 34px;
  &__descr {
    margin: 0;
    width: 262px;
    color: $colorwhite;
    font-size: 32px;
    font-weight: 600;
  }
  &__content {
    @include flexbox-column;
    gap: 34px;
  }
  &__shortcut-template {
    display: flex;
    gap: 32px;
  }
  &__img {
    width: 64px;
    height: 64px;
  }
  &__area-people {
    display: flex;
    gap: 27px;
  }
  &__price-advanced {
    display: flex;
    gap: 25px;
  }
}
.address {
  align-self: center;
  &__title {
    color: $colorwhite;
    font-size: 24px;
    margin-bottom: 10px;
  }
  &__descr {
    color: $gray-50;
    font-size: 22px;
  }
}

.date,
.room-area,
.people {
  @include flexbox-column;
}

.room-area {
  width: 200px;
}

.people {
  width: 150px;
}

.price {
  width: 150px;
}

.recent__about {
  color: $colorwhite;
  font-size: 22px;
}

.recent__descr {
  color: $gray-50;
  font-size: 22px;
}

.advanced-btn {
  width: 182px;
  padding: 25px 42px;
  background-color: $colorwhite;
  border-radius: 70px;
  border: none;
  font-size: 20px;
  font-weight: 500;
}

.no-deals {
  position: relative;
  height: 100%;
  @include flexbox-column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  &__wrapper {
    @include flexbox-column;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }
  &__img {
    width: 34px;
    height: 34px;
  }
  &__descr {
    color: $gray-50;
    font-size: 20px;
  }
}

.position-btn {
  width: 220px;
  position: absolute;
  bottom: 24px;
  left: 90px;
}
</style>
