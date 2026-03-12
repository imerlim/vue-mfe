// src/stores/auth.ts
import { defineStore } from 'pinia'

// Aqui já estamos usando TypeScript para definir quem é o usuário
interface UserState {
  name: string
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): UserState => ({
    name: 'Igor Merlim',
    isAuthenticated: true
  }),
  actions: {
    logout() {
      this.isAuthenticated = false
      this.name = ''
    }
  }
})