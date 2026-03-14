import { ref } from 'vue'
import api from '@/services/api'

export function useAuth() {
    const isSubmitting = ref(false)
    const errorMsg = ref<string | null>(null)

    const register = async (userData: any) => {
        isSubmitting.value = true
        errorMsg.value = null

        try {
            // Note que a rota continua sendo '/users' no NestJS
            const response = await api.post('/users/create', userData)
            return response.data
        } catch (err: any) {
            // Captura a mensagem que configuramos no Exception do NestJS
            errorMsg.value = err.response?.data?.message || 'Erro ao realizar cadastro'
            throw err
        } finally {
            isSubmitting.value = false
        }
    }

    // No futuro, adicionaremos o 'login' aqui dentro também
    return {
        register,
        isSubmitting,
        errorMsg
    }
}
