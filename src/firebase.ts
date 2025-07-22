import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAeLdB8tJ6Ml8bRYCZ8okWTAb5zF2LYps8',
  authDomain: 'crm-dashboard-ed267.firebaseapp.com',
  projectId: 'crm-dashboard-ed267',
  storageBucket: 'crm-dashboard-ed267.firebasestorage.app',
  messagingSenderId: '904224327364',
  appId: '1:904224327364:web:6908dd401ea229b6ecab91',
  measurementId: 'G-R9R1Z95E8D',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
