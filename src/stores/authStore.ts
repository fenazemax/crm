import { auth } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface IUser {
  email: string
  uid: string
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<IUser | null>(null)
    const isAuth = ref(false)
    const authReady = ref(false)

    const login = async (email: string, password: string) => {
      const res = await signInWithEmailAndPassword(auth, email, password)
      user.value = { email: res.user.email || '', uid: res.user.uid }
      isAuth.value = true
    }

    const register = async (email: string, password: string) => {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      user.value = { email: res.user.email || '', uid: res.user.uid }
      isAuth.value = true
    }

    const logout = async () => {
      await signOut(auth)
      user.value = null
      isAuth.value = false
    }

    const initAuth = () => {
      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            user.value = { email: firebaseUser.email || '', uid: firebaseUser.uid }
            isAuth.value = true
          } else {
            user.value = null
            isAuth.value = false
          }
          authReady.value = true
          resolve()
        })
      })
    }

    return {
      user,
      isAuth,
      login,
      register,
      logout,
      initAuth,
      authReady,
    }
  },
  {
    persist: true,
  },
)
