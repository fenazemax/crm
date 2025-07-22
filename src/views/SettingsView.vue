<script setup lang="ts">
import { auth } from '@/firebase'
import { useAuthStore } from '@/stores/authStore'
import { sendPasswordResetEmail } from 'firebase/auth'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const username = computed(() => authStore.user?.email.split('@')[0])

const resetPassword = async () => {
  await sendPasswordResetEmail(auth, auth.currentUser!.email!)
  alert('Password reset email sent')
}

const deleteAccount = async () => {
  await auth.currentUser?.delete()
  alert('Account deleted')
  router.push('/register')
}
</script>

<template>
  <div class="settings">
    <div class="settings__text">
      <h2 class="settings__title">Hello, {{ username }}</h2>
      <span class="settings__descr">Here, you can reset your password or delete account</span>
    </div>
    <div class="settings__btn-wrapper">
      <button class="settings__reset" @click="resetPassword">Reset Password</button>
      <button class="settings__delete" @click="deleteAccount">Delete Account</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.settings {
  @include flexbox-column;
  gap: 90px;
  padding: 20px;
  &__text {
    @include flexbox-column;
  }
  &__title {
    margin: 0;
    @include navy-descr;
    font-weight: 600;
  }
  &__descr {
    @include gray-descr;
  }
  &__btn-wrapper {
    display: flex;
    gap: 20px;
    .settings__delete {
      @include modal-cancel-btn;
      color: $primary-pink;
    }
    .settings__reset {
      @include modal-save-btn;
    }
  }
}
</style>
