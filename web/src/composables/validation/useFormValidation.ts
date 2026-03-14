import { ref } from 'vue'
import { isValidCPF } from '@/utils/validation/validators'

export function useFormValidation() {
    const cpfError = ref<string | null>(null)

    const validateCPFField = (value: string) => {
        if (!value) {
            cpfError.value = 'O CPF é obrigatório.'
            return false
        }
        if (!isValidCPF(value)) {
            cpfError.value = 'CPF inválido.'
            return false
        }
        cpfError.value = null
        return true
    }

    return {
        cpfError,
        validateCPFField
    }
}
