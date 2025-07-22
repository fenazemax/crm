<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref<string>('')
const password = ref<string>('')
const authStore = useAuthStore()
const router = useRouter()

const handleRegister = async () => {
  try {
    await authStore.register(username.value, password.value)
    router.push('/')
  } catch (e) {
    alert('Неверный логин или пароль')
    console.log(e)
  }
}
</script>

<template>
  <div class="container">
    <h3>Register form</h3>
    <form @submit.prevent="handleRegister" class="form">
      <input type="text" v-model="username" class="form__input" placeholder="Write email" />
      <input type="password" v-model="password" class="form__input" placeholder="Write password" />
      <div class="form__wrapper">
        <button type="submit" class="form__btn">Register</button>
        <RouterLink to="/login" class="form__btn">Login</RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.form {
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__input {
    padding: 12px;
    border: 1px solid var(--gray-70);
    border-radius: 15px;
    &:hover {
      outline: 3px solid var(--blue);
    }
    &:focus {
      border: 1px solid var(--gray-90);
      outline: none;
    }
  }
  &__wrapper {
    display: flex;
    gap: 10px;
  }
  &__btn {
    align-self: center;
    width: 50%;
    text-decoration: none;
    padding: 12px;
    font-size: 15px;
    border: 1px solid var(--gray-70);
    border-radius: 15px;
    background-color: var(--blue);
    color: var(--white);
    text-align: center;
    &:hover {
      background-color: var(--blue-hover);
    }
    &:active {
      background-color: var(--navy);
    }
  }
}
</style>
