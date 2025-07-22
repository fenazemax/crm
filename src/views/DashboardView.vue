<script setup lang="ts">
import CustomersCountCard from '@/components/Dashboard/CustomersCountCard.vue'
import CustomersDisplayCard from '@/components/Dashboard/CustomersDisplayCard.vue'
import DealsCountCard from '@/components/Dashboard/DealsCountCard.vue'
import InProgressCard from '@/components/Dashboard/InProgressCard.vue'
import NextDealCard from '@/components/Dashboard/NextDealCard.vue'
import ResentDealsCard from '@/components/Dashboard/ResentDealsCard.vue'
import TasksToDoCard from '@/components/Dashboard/TasksToDoCard.vue'
</script>

<template>
  <div class="dashboard-container">
    <div class="dashboard-left">
      <div class="grid">
        <div class="grid__col-1">
          <NextDealCard />
        </div>
        <div class="grid__col-2">
          <ResentDealsCard />
        </div>
        <div class="grid__col-3">
          <div class="customer-count">
            <CustomersCountCard />
          </div>
          <div class="deals-count">
            <DealsCountCard />
          </div>
        </div>
        <div class="grid__col-4">
          <InProgressCard />
        </div>
      </div>
    </div>
    <div class="dashboard-right">
      <CustomersDisplayCard />
      <TasksToDoCard />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;
.dashboard-container {
  display: flex;
  gap: 73px;
}
.dashboard-left {
  flex: 1;
}
.dashboard-right {
  width: 517px;
  height: 980px;
  background-color: $blue-light;
}

.grid {
  padding-top: 20px;
  padding-left: 20px;
  display: grid;
  grid-template-columns: 468px 719px;
  grid-template-rows: 492px 460px;
  gap: 30px;
  &__col-1 {
    padding: 34px;
    border-radius: 12px;
    background-color: $bluecolor;
  }
  &__col-2,
  &__col-4 {
    background-color: $colorwhite;
    border-radius: 12px;
  }
  &__col-3 {
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: $background-color;
  }

  .deals-count,
  .customer-count {
    border-radius: 12px;
    width: 100%;
    height: 45%;
    background-color: $colorwhite;
  }
}
</style>
