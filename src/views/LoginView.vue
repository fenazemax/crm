<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref<string>('')
const password = ref<string>('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    await authStore.login(username.value, password.value)
    if (authStore.isAuth) {
      router.push('/')
    }
  } catch (e) {
    alert('Неверный email или пароль')
    console.log(e)
  }
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleLogin" class="form">
      <input type="text" v-model="username" class="form__input" placeholder="Write email" />
      <input type="password" v-model="password" class="form__input" placeholder="Write password" />
      <div class="form__wrapper">
        <button type="submit" class="form__btn">Login</button>
        <RouterLink to="/register" class="form__btn">Register</RouterLink>
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
    border: none;
    outline: 1px solid var(--gray-70);
    border-radius: 15px;
    transition: outline 0.2s ease-in-out;
    &:hover {
      border: none;
      outline: 2px solid var(--blue);
    }
    &:focus {
      outline: 1px solid var(--gray-90);
      border: none;
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
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: var(--blue-hover);
    }
    &:active {
      background-color: var(--navy);
    }
  }
}
</style>
